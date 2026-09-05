from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator
import re

class UserRegisterRequest(BaseModel):
    email: str = Field(..., description="Alamat email aktif")
    password: str = Field(..., min_length=8, description="Kata sandi minimal 8 karakter")
    name: str = Field(..., min_length=2, max_length=150, description="Nama lengkap pemilik usaha")
    company: str = Field(..., min_length=2, max_length=150, description="Nama brand / toko UMKM")
    whatsapp: Optional[str] = Field(default=None, max_length=30, description="Nomor WhatsApp")

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v):
        v = v.strip().lower()
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", v):
            raise ValueError("Format email tidak valid.")
        return v

    @field_validator("password")
    @classmethod
    def validate_password_min_length(cls, v):
        if len(v) < 8:
            raise ValueError("Kata sandi harus minimal 8 karakter.")
        return v

class UserLoginRequest(BaseModel):
    email: str = Field(..., description="Alamat email terdaftar")
    password: str = Field(..., min_length=1, description="Kata sandi")

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v):
        return v.strip().lower()

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    company: str
    whatsapp: Optional[str] = None
    role: str = "user"
    is_active: bool = True
    created_at: Optional[str] = None

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
