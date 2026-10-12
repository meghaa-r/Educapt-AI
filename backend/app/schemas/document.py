
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class DocumentCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    filename: str
    content: str
    file_type: Literal["pdf", "docx", "txt"]


class DocumentResponse(BaseModel):
    id: str
    title: str
    filename: str
    file_type: str
    created_at: datetime


class DocumentDetailResponse(DocumentResponse):
    content: str
