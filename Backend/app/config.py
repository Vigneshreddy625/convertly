import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Document Converter API"
    UPLOAD_DIR: str = os.path.join(os.getcwd(), "uploads")
    OUTPUT_DIR: str = os.path.join(os.getcwd(), "outputs")
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50 MB
    
    # Make sure directories exist
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    class Config:
        env_file = ".env"

settings = Settings()