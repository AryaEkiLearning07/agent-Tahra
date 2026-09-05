from fastapi import APIRouter
from app.api.v1.endpoints import campaigns, analytics, health, auth

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & Security"])
api_router.include_router(campaigns.router, tags=["Campaigns & Orchestration"])
api_router.include_router(analytics.router, tags=["Analytics & Tracking"])
