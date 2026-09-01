from fastapi import APIRouter
from app.core.config import settings
from app.core.cache import llm_cache

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "llm_model": settings.LLM_MODEL,
        "cache_entries": llm_cache.size
    }
