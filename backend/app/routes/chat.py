from fastapi import APIRouter
from app.models.schemas import ChatRequest
from app.services.memory_service import save_memory
from app.chains.chat_chain import get_chat_response
import re

router = APIRouter()

def is_memory_worthy(message: str) -> bool:
    message = message.lower()

    # Match personal facts
    fact_patterns = [
        r"\bi (have|take|use|suffer from|was diagnosed with|am allergic to)\b",
        r"\bmy (child|daughter|son|condition|doctor|medication|symptoms)\b",
        r"\bi (live|reside) in\b",
        r"\bi feel\b",
        r"\bi struggle with\b",
        r"\bi've been\b",
        r"\bi need help with\b"
    ]

    # Match personal questions
    question_patterns = [
        r"\bcan i\b",
        r"\bshould i\b",
        r"\bis it safe\b",
        r"\bwhat should i do\b",
        r"\bhow do i\b",
        r"\bdoes my\b",
        r"\bwill it affect\b"
    ]

    for pattern in fact_patterns + question_patterns:
        if re.search(pattern, message):
            return True

    return "remember that" in message

@router.post("/chat")
async def chat(request: ChatRequest):
    user_id = request.user_id
    message = request.message
    language = request.language

    if is_memory_worthy(message):
        save_memory(user_id, message)
        return {"response": "Got it! I'll remember that 💡"}

    response = await get_chat_response(message=message, language=language, user_id=user_id)
    return {"response": response}
