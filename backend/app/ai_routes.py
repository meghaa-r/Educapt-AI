import os
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/ai", tags=["AI Services"])

class TextRequest(BaseModel):
    text: str

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

@router.post("/simplify")
def simplify_text(request: TextRequest):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key is missing from the environment.")

    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    candidate_models = [
        "nvidia/nemotron-3.5-lightning:free",
        "google/gemma-4-26b-a4b-it:free",
        "qwen/qwen3.8-27b:free"
    ]

    # Flexible prompt: Answers chat questions naturally while simplifying passage selections
    prompt = f"""You are Educapt AI Tutor, an accessible reading assistant for neurodivergent learners.

Guidelines:
1. If the user provides a passage or highlighted text to simplify, extract the core meaning in 3 to 5 clear, direct bullet points. Avoid metaphors or complex jargon.
2. If the user asks a question, greets you, or seeks clarification, answer directly, supportively, and concisely in simple language.

User Input:
{request.text}"""

    last_error = None

    for model_id in candidate_models:
        try:
            response = requests.post(
                url="https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": model_id,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.4
                },
                timeout=15
            )

            if response.status_code == 200:
                data = response.json()
                content = data['choices'][0]['message']['content']
                if content and content.strip():
                    return {"simplified_text": content}

            last_error = response.text
        except Exception as err:
            last_error = str(err)

    raise HTTPException(
        status_code=500, 
        detail=f"OpenRouter Error across all candidates: {last_error}"
    )