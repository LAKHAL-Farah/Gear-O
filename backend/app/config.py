from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # NVIDIA NIM
    nim_api_key: str
    nim_base_url: str = "https://integrate.api.nvidia.com/v1"
    model_name: str = "meta/llama-3.1-70b-instruct"

    # LLM Behavior
    temperature: float = 0.3
    max_tokens: int = 1500

    # App
    max_history: int = 10
    cors_origins: str = "http://localhost:3000"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()