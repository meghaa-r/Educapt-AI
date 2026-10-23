from io import BytesIO
from datetime import datetime, timezone

import pdfplumber
from docx import Document as DocxDocument
from bson import ObjectId
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from app.database.connection import database
from app.dependencies.auth import get_current_user
from app.schemas.document import (
    DocumentCreateRequest,
    DocumentResponse,
    DocumentDetailResponse,
)

router = APIRouter(prefix="/api/documents", tags=["Documents"])

documents_collection = database["documents"]


def serialize_document(document: dict) -> dict:
    return {
        "id": str(document["_id"]),
        "title": document["title"],
        "filename": document["filename"],
        "file_type": document["file_type"],
        "created_at": document["created_at"],
    }


@router.post(
    "",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_document(
    payload: DocumentCreateRequest,
    current_user: dict = Depends(get_current_user),
):
    document = {
        "user_id": str(current_user["_id"]),
        "title": payload.title,
        "filename": payload.filename,
        "content": payload.content,
        "file_type": payload.file_type,
        "created_at": datetime.now(timezone.utc),
    }

    result = await documents_collection.insert_one(document)
    document["_id"] = result.inserted_id

    return serialize_document(document)


@router.get("", response_model=list[DocumentResponse])
async def list_documents(
    current_user: dict = Depends(get_current_user),
):
    results = []

    async for document in documents_collection.find(
        {"user_id": str(current_user["_id"])}
    ).sort("created_at", -1):
        results.append(serialize_document(document))

    return results


@router.post(
    "/upload",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    # 1. Validate the uploaded filename
    filename = file.filename or ""
    extension = filename.rsplit(".", 1)[-1].lower()

    if "." not in filename or extension not in {"pdf", "docx"}:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported.",
        )

    # 2. Read the file and enforce a 10 MB limit
    file_bytes = await file.read()
    max_size = 10 * 1024 * 1024

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    if len(file_bytes) > max_size:
        raise HTTPException(
            status_code=413,
            detail="File size must not exceed 10 MB.",
        )

    # 3. Extract text from the document
    try:
        if extension == "pdf":
            with pdfplumber.open(BytesIO(file_bytes)) as pdf:
                content = "\n".join(
                    page.extract_text() or ""
                    for page in pdf.pages
                )
        else:
            doc = DocxDocument(BytesIO(file_bytes))
            content = "\n".join(
                paragraph.text for paragraph in doc.paragraphs
            )

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read this file. Please upload a valid PDF or DOCX.",
        ) from None

    if not content.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text was found in the document.",
        )

    # 4. Save the document with its owner's ID
    document = {
        "user_id": str(current_user["_id"]),
        "title": filename.rsplit(".", 1)[0][:200] or "Untitled",
        "filename": filename,
        "content": content,
        "file_type": extension,
        "created_at": datetime.now(timezone.utc),
    }

    result = await documents_collection.insert_one(document)
    document["_id"] = result.inserted_id

    # 5. Return the saved document metadata
    return serialize_document(document)


@router.get(
    "/{document_id}",
    response_model=DocumentDetailResponse,
)
async def get_document(
    document_id: str,
    current_user: dict = Depends(get_current_user),
):
    if not ObjectId.is_valid(document_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid document ID",
        )

    # Find the document only if it belongs to the logged-in user
    document = await documents_collection.find_one(
        {
            "_id": ObjectId(document_id),
            "user_id": str(current_user["_id"]),
        }
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {
        **serialize_document(document),
        "content": document["content"],
    }


@router.delete(
    "/{document_id}",
    status_code=status.HTTP_200_OK,
)
async def delete_document(
    document_id: str,
    current_user: dict = Depends(get_current_user),
):
    if not ObjectId.is_valid(document_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid document ID",
        )

    # Delete the document only if it belongs to the logged-in user
    result = await documents_collection.delete_one(
        {
            "_id": ObjectId(document_id),
            "user_id": str(current_user["_id"]),
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {"message": "Document successfully deleted"}