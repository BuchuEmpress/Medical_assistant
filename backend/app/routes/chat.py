from fastapi import APIRouter
from app.models.schemas import ChatRequest
from app.services.memory_service import save_memory
from app.chains.chat_chain import get_chat_response

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest):
    user_id = request.user_id
    message = request.message
    language = request.language

    if "remember that" in message.lower():
        fact = message.split("remember that", 1)[-1].strip()
        save_memory(user_id, fact)
        return {"response": "Got it! I'll remember that 💡"}

    response = get_chat_response(message=message, language=language, user_id=user_id)
    return {"response": response}
