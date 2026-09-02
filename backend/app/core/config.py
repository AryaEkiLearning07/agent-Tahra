import os
from typing import Optional
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "TAHRA AI — Enterprise Multi-Agent Engine"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # LLM Gateway Configuration
    LLM_BASE_URL: str = Field(default="https://api.groq.com/openai/v1", env="LLM_BASE_URL")
    LLM_API_KEY: str = Field(default="", env="LLM_API_KEY")
    GROQ_API_KEY: Optional[str] = Field(default=None, env="GROQ_API_KEY")
    OPENAI_API_KEY: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    LLM_MODEL: str = Field(default="llama-3.3-70b-versatile", env="LLM_MODEL")
    LLM_TIMEOUT: float = 60.0
    LLM_MAX_RETRIES: int = 3

    @property
    def active_api_key(self) -> str:
        return (
            os.getenv("LLM_API_KEY")
            or os.getenv("GROQ_API_KEY")
            or os.getenv("OPENAI_API_KEY")
            or self.LLM_API_KEY
            or self.GROQ_API_KEY
            or self.OPENAI_API_KEY
            or ""
        )
    
    # Database Configuration (Defaults to local SQLite async, easily switchable to MySQL/Postgres in prod)
    DATABASE_URL: str = Field(
        default="sqlite+aiosqlite:///./tahra_production.db",
        env="DATABASE_URL"
    )
    
    # Cache Configuration
    CACHE_TTL_SECONDS: int = 3600  # 1 hour default TTL for LLM agent outputs
    ENABLE_LLM_CACHE: bool = True
    
    # CORS
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
