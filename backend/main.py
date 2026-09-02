import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api.v1.api import api_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("tahra.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for database initialization and cleanup"""
    logger.info("Initializing database schema...")
    try:
        await init_db()
        logger.info("TAHRA AI Engine initialized successfully.")
    except Exception as e:
        logger.warning(f"⚠️ Database init warning (falling back gracefully): {e}")
    yield
    logger.info("Shutting down TAHRA AI Engine...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Scalable Multi-Agent Digital Marketing & Anti-Boncos ROAS Simulator Engine",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Primary API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Legacy / Direct Compatibility Routes for Frontend
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": "1.0.0",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
