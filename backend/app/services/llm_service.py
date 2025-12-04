import json
from typing import AsyncGenerator

import httpx

from app.config import settings


class LLMService:
    def __init__(self):
        self.api_url = settings.llm_api_url
        self.model = settings.llm_model

    async def generate_response(self, prompt: str) -> str:
        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(
                    self.api_url,
                    json={"model": self.model, "prompt": prompt, "stream": False},
                )
                response.raise_for_status()
                data = response.json()
                return data.get("response", "No response from LLM")
            except httpx.HTTPError as e:
                raise Exception(f"Error communicating with LLM: {str(e)}")

    async def generate_response_stream(self, prompt: str) -> AsyncGenerator[str, None]:
        async with httpx.AsyncClient(timeout=120.0) as client:
            try:
                async with client.stream(
                    "POST",
                    self.api_url,
                    json={"model": self.model, "prompt": prompt, "stream": True},
                ) as response:
                    response.raise_for_status()
                    async for line in response.aiter_lines():
                        if line.strip():
                            try:
                                data = json.loads(line)
                                if "response" in data:
                                    yield data["response"]
                            except json.JSONDecodeError:
                                continue
            except httpx.HTTPError as e:
                raise Exception(f"Error communicating with LLM: {str(e)}")

    async def health_check(self) -> bool:
        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                response = await client.get(
                    self.api_url.replace("/api/generate", "/api/tags")
                )
                return response.status_code == 200
            except Exception:
                return False


llm_service = LLMService()
