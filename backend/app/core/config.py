import os
from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "TAHRA AI — Enterprise Multi-Agent Engine"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # LLM Gateway Configuration (Inkey Claudia 3.8 Ultra Gateway)
    LLM_BASE_URL: str = Field(default="https://inkey.my.id/v1", env="LLM_BASE_URL")
    LLM_API_KEY: Optional[str] = Field(default=None, env="LLM_API_KEY")
    GROQ_API_KEY: Optional[str] = Field(default=None, env="GROQ_API_KEY")
    OPENAI_API_KEY: Optional[str] = Field(default=None, env="OPENAI_API_KEY")
    LLM_MODEL: str = Field(default="claudia-3.8-ultra", env="LLM_MODEL")
    LLM_TIMEOUT: float = 90.0
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
        validation_alias="DATABASE_URL"
    )
    
    # Cache Configuration
    CACHE_TTL_SECONDS: int = 3600  # 1 hour default TTL for LLM agent outputs
    ENABLE_LLM_CACHE: bool = True
    
    # CORS
    CORS_ORIGINS: list[str] = ["*"]

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
