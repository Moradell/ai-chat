from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    llm_api_url: str = "http://localhost:11434/api/generate"
    llm_model: str = "llama2"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
