from datetime import datetime

from fastapi import APIRouter, HTTPException

from app.models import ChatRequest, ChatResponse, HealthResponse
from app.services import llm_service

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = await llm_service.generate_response(request.message)
        return ChatResponse(message=response, timestamp=datetime.now().isoformat())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health", response_model=HealthResponse)
async def health_check():
    llm_connected = await llm_service.health_check()
    return HealthResponse(
        status="healthy" if llm_connected else "degraded", llm_connected=llm_connected
    )
