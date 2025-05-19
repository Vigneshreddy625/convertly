from pydantic_settings import BaseSettings
from pathlib import Path
import os
from functools import lru_cache

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Document Converter API"
    UPLOAD_DIR: str = str(Path.cwd() / "uploads")
    OUTPUT_DIR: str = str(Path.cwd() / "outputs")
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50 MB

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_SERVER: str 
    POSTGRES_PORT: int = 5432
    POSTGRES_DB: str 
    
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
    SUPABASE_STORAGE_URL: str = f"{SUPABASE_URL}/storage/v1/object/public"

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/convertly"

    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache()
def get_settings() -> Settings:
    s = Settings()
    os.makedirs(s.UPLOAD_DIR, exist_ok=True)
    os.makedirs(s.OUTPUT_DIR, exist_ok=True)
    return s

# Global instance (SAFE due to lru_cache)
settings = get_settings()
