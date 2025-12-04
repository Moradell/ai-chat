from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router as chat_router
from app.config import settings

app = FastAPI(
    title="AI Chat API",
    description="FastAPI backend for AI chat with local LLM",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api", tags=["chat"])


@app.get("/")
async def root():
    return {"message": "AI Chat API", "version": "0.1.0", "docs": "/docs"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app", host=settings.api_host, port=settings.api_port, reload=True
    )
