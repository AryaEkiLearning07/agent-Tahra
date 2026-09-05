import os
import hmac
import hashlib
import base64
import json
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple, Dict, Any

# Secret key for token signing
SECRET_KEY = os.getenv("SECRET_KEY", "tahra_ai_secure_jwt_secret_2026_super_key")
TOKEN_EXPIRE_DAYS = 30
ITERATIONS = 350000

def hash_password(password: str) -> str:
    """
    Hash a password using PBKDF2-HMAC-SHA256 with a unique random salt.
    Format: pbkdf2_sha256$iterations$salt_hex$hash_hex
    """
    salt = secrets.token_bytes(16)
    salt_hex = salt.hex()
    pwd_hash = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        ITERATIONS
    )
    hash_hex = pwd_hash.hex()
    return f"pbkdf2_sha256${ITERATIONS}${salt_hex}${hash_hex}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plaintext password against a stored PBKDF2-HMAC-SHA256 hash.
    """
    try:
        parts = hashed_password.split('$')
        if len(parts) != 4 or parts[0] != "pbkdf2_sha256":
            return False
        iterations = int(parts[1])
        salt = bytes.fromhex(parts[2])
        stored_hash = parts[3]

        computed_hash = hashlib.pbkdf2_hmac(
            'sha256',
            plain_password.encode('utf-8'),
            salt,
            iterations
        ).hex()

        return hmac.compare_digest(stored_hash, computed_hash)
    except Exception:
        return False

def validate_password_strength(password: str) -> Tuple[bool, Optional[str]]:
    """
    Strict password validation: Minimum 8 characters.
    """
    if not password or len(password) < 8:
        return False, "Kata sandi wajib memiliki panjang minimal 8 karakter."
    return True, None

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a lightweight signed URL-safe JWT-compatible Bearer token.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=TOKEN_EXPIRE_DAYS)

    header = {"alg": "HS256", "typ": "JWT"}
    payload = {
        **to_encode,
        "exp": int(expire.timestamp()),
        "iat": int(datetime.now(timezone.utc).timestamp()),
    }

    header_b64 = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')

    signature_input = f"{header_b64}.{payload_b64}"
    signature = hmac.new(
        SECRET_KEY.encode(),
        signature_input.encode(),
        hashlib.sha256
    ).digest()
    sig_b64 = base64.urlsafe_b64encode(signature).decode().rstrip('=')

    return f"{header_b64}.{payload_b64}.{sig_b64}"

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Validate signature and expiration of access token.
    """
    try:
        parts = token.strip().split('.')
        if len(parts) != 3:
            return None

        header_b64, payload_b64, sig_b64 = parts
        signature_input = f"{header_b64}.{payload_b64}"

        expected_sig = hmac.new(
            SECRET_KEY.encode(),
            signature_input.encode(),
            hashlib.sha256
        ).digest()
        expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip('=')

        if not hmac.compare_digest(sig_b64, expected_sig_b64):
            return None

        # Add padding back for base64 decode
        rem = len(payload_b64) % 4
        if rem > 0:
            payload_b64 += '=' * (4 - rem)

        payload_json = base64.urlsafe_b64decode(payload_b64.encode()).decode()
        payload = json.loads(payload_json)

        # Check expiration
        exp = payload.get("exp")
        if exp and datetime.now(timezone.utc).timestamp() > exp:
            return None

        return payload
    except Exception:
        return None
