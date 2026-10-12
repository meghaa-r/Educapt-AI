
from datetime import datetime, timezone


def create_user_document(
    name: str,
    email: str,
    hashed_password: str,
) -> dict:
    """Build the MongoDB document for a new Educapt AI user."""
    now = datetime.now(timezone.utc)

    return {
        "name": name,
        "email": email.lower().strip(),
        "hashed_password": hashed_password,
        "profile_preset": "default",
        "created_at": now,
        "updated_at": now,
    }
