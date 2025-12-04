from datetime import datetime
from typing import AsyncGenerator

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

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


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    async def generate() -> AsyncGenerator[str, None]:
        try:
            async for chunk in llm_service.generate_response_stream(request.message):
                yield f"data: {chunk}\n\n"
        except Exception as e:
            yield f"data: [ERROR] {str(e)}\n\n"
        finally:
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/health", response_model=HealthResponse)
async def health_check():
    llm_connected = await llm_service.health_check()
    return HealthResponse(
        status="healthy" if llm_connected else "degraded", llm_connected=llm_connected
    )
