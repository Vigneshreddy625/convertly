import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Document Converter API"
    UPLOAD_DIR: str = os.path.join(os.getcwd(), "uploads")
    OUTPUT_DIR: str = os.path.join(os.getcwd(), "outputs")
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50 MB
    
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", 5432))  # Change to integer
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "tdd")
    
    DATABASE_URL: str = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    
    # Make sure directories exist
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    class Config:
        env_file = ".env"

settings = Settings()
