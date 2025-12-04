from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    message: str
    timestamp: str = datetime.now().isoformat()


class HealthResponse(BaseModel):
    status: str
    llm_connected: bool
