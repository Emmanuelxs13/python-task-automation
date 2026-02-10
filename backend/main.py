"""
SecureCheck Backend - Main Entry Point
FastAPI application setup and configuration
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title=os.getenv("PROJECT_NAME", "SecureCheck"),
    description="Plataforma de análisis de seguridad básica para pequeñas empresas",
    version=os.getenv("VERSION", "1.0.0"),
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "SecureCheck API",
        "status": "online",
        "version": os.getenv("VERSION", "1.0.0")
    }


@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "database": "connected"  # TODO: Add real DB check
    }


# TODO: Import and include routers in Sprint 1
# from app.api import auth, scans, reports, users
# app.include_router(auth.router, prefix=f"{os.getenv('API_V1_PREFIX')}/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
