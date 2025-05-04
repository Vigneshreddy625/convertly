from fastapi import UploadFile, HTTPException
import os
import uuid
from app.config import settings

async def save_upload_file(file: UploadFile) -> str:
    """Save an uploaded file and return the file path"""
    if file.size > settings.MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large")
    
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    return file_path