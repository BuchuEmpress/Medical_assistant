from services.memory_service import save_memory
from fastapi import APIRouter
from app.models.schemas import ChatRequest
from services.memory_service import save_memory

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest):
    user_id = request.user_id
    message = request.message

    if "remember that" in message.lower():
        fact = message.split("remember that", 1)[-1].strip()
        save_memory(user_id, fact)
        return {"response": "Got it! I'll remember that 💡"}
    return {"response": "Message received. How can I assist your health today?"}

    # Otherwise, continue with normal chat flow
