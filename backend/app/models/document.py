
from datetime import datetime, timezone

from pydantic import BaseModel, Field


class DocumentCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    filename: str
    content: str
    file_type: str


class DocumentResponse(BaseModel):
    id: str
    title: str
    filename: str
    content: str
    file_type: str
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
