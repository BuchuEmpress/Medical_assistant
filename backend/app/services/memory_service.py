# app/services/memory_service.py

user_memory = {}

def save_memory(user_id: str, fact: str):
    if user_id not in user_memory:
        user_memory[user_id] = []
    user_memory[user_id].append(fact)

def get_memory(user_id: str):
    return user_memory.get(user_id, [])
