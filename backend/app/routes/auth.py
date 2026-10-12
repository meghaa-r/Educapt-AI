
from fastapi import APIRouter

from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
)
from app.services.auth_service import register_user, login_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(request: UserRegisterRequest):
    return await register_user(
        name=request.name,
        email=str(request.email),
        password=request.password,
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: UserLoginRequest):
    return await login_user(
        email=str(request.email),
        password=request.password,
    )
