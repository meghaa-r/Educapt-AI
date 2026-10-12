
from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException, status

from app.database.connection import database
from app.models.user import create_user_document
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

users_collection = database["users"]


def user_response(user_id: str, user: dict) -> dict:
    return {
        "id": user_id,
        "name": user["name"],
        "email": user["email"],
        "profile_preset": user.get("profile_preset", "default"),
    }


async def register_user(name: str, email: str, password: str) -> dict:
    normalized_email = email.strip().lower()

    existing_user = await users_collection.find_one(
        {"email": normalized_email}
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user_document = create_user_document(
        name=name.strip(),
        email=normalized_email,
        hashed_password=hash_password(password),
    )

    result = await users_collection.insert_one(user_document)
    user_id = str(result.inserted_id)

    return {
        "access_token": create_access_token(user_id),
        "token_type": "bearer",
        "user": user_response(user_id, user_document),
    }


async def login_user(email: str, password: str) -> dict:
    normalized_email = email.strip().lower()

    user = await users_collection.find_one(
        {"email": normalized_email}
    )

    if not user or not verify_password(
        password, user["hashed_password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "access_token": create_access_token(str(user["_id"])),
        "token_type": "bearer",
        "user": user_response(str(user["_id"]), user),
    }
