
from fastapi.middleware.cors import CORSMiddleware
from app.routes.documents import router as documents_router
from app.routes.auth import router as auth_router

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database.connection import (
    check_database_connection,
    close_database_connection,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verify MongoDB when the backend starts
    await check_database_connection()
    print("MongoDB connected successfully!")

    yield

    # Close MongoDB when the backend stops
    await close_database_connection()
    print("MongoDB connection closed.")


app = FastAPI(
    title="Educapt AI API",
    description="Backend API for the Educapt AI reading workspace",
    version="1.0.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(documents_router)
app.include_router(auth_router)



@app.get("/")
async def home():
    return {"message": "Educapt AI backend is running!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/health/database")
async def database_health_check():
    await check_database_connection()
    return {"status": "healthy", "database": "connected"}
