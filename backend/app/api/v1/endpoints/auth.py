import logging
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.user import UserModel
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    AuthResponse,
    UserResponse
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    validate_password_strength
)

logger = logging.getLogger("tahra.auth")
router = APIRouter()

async def get_current_user(
    authorization: str = Header(None),
    db: AsyncSession = Depends(get_db)
) -> UserModel:
    """Dependency to retrieve authenticated user from Bearer Token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token otentikasi tidak ditemukan atau tidak valid.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sesi login kedaluwarsa atau token tidak valid. Silakan login kembali.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload.get("sub")
    stmt = select(UserModel).where(UserModel.id == int(user_id))
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Pengguna tidak ditemukan atau akun dinonaktifkan.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    payload: UserRegisterRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Register a new UMKM account with strict minimum 8-character password.
    Saves securely to database with PBKDF2-HMAC-SHA256 hash.
    """
    # Check if email is already registered
    stmt = select(UserModel).where(UserModel.email == payload.email)
    existing_user = (await db.execute(stmt)).scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{payload.email}' sudah terdaftar. Silakan gunakan menu Masuk."
        )

    # Validate password strength
    is_valid_pwd, pwd_error = validate_password_strength(payload.password)
    if not is_valid_pwd:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=pwd_error
        )

    # Hash password and create user
    hashed = hash_password(payload.password)
    new_user = UserModel(
        email=payload.email,
        hashed_password=hashed,
        name=payload.name,
        company=payload.company,
        whatsapp=payload.whatsapp,
        role="user",
        is_active=True
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # Generate JWT Token
    token = create_access_token(
        data={"sub": str(new_user.id), "email": new_user.email, "role": new_user.role}
    )

    logger.info(f"User registered successfully: {new_user.email} (ID: {new_user.id})")

    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(**new_user.to_dict())
    )

@router.post("/login", response_model=AuthResponse)
async def login_user(
    payload: UserLoginRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Authenticate user against database records.
    Rejects invalid credentials or unauthorized attempts.
    """
    stmt = select(UserModel).where(UserModel.email == payload.email)
    user = (await db.execute(stmt)).scalar_one_or_none()

    # Generic error message to prevent user enumeration
    invalid_creds_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Email atau kata sandi tidak sesuai. Silakan periksa kembali.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not user:
        logger.warning(f"Login failed: Email not found '{payload.email}'")
        raise invalid_creds_exception

    if not verify_password(payload.password, user.hashed_password):
        logger.warning(f"Login failed: Invalid password for '{payload.email}'")
        raise invalid_creds_exception

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Akun Anda telah dinonaktifkan. Hubungi administrator."
        )

    # Generate Token
    token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": user.role}
    )

    logger.info(f"User logged in successfully: {user.email} (ID: {user.id})")

    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=UserResponse(**user.to_dict())
    )

@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: UserModel = Depends(get_current_user)
):
    """Return currently authenticated user profile"""
    return UserResponse(**current_user.to_dict())
