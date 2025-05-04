import os
import shutil
from fastapi import HTTPException
import uuid
from datetime import datetime, timedelta
import zipfile
import logging
import os
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def delete_after_delay(path: str, delay: int = 3600):
    try:
        time.sleep(delay)
        if os.path.exists(path):
            os.unlink(path)
    except Exception as e:
        print(f"Error deleting file {path}: {str(e)}")

def sanitize_filename(filename: str) -> str:
    """Sanitize filename by removing potentially dangerous characters"""
    # Replace problematic characters
    illegal_chars = ['/', '\\', ':', '*', '?', '"', '<', '>', '|']
    for char in illegal_chars:
        filename = filename.replace(char, '_')
    return filename

def cleanup_old_files(directory: str, max_age_hours: int = 24):
    """Remove files older than specified hours"""
    try:
        now = datetime.now()
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            if os.path.isfile(file_path):
                file_creation_time = datetime.fromtimestamp(os.path.getctime(file_path))
                if now - file_creation_time > timedelta(hours=max_age_hours):
                    os.unlink(file_path)
                    logger.info(f"Removed old file: {file_path}")
    except Exception as e:
        logger.error(f"Error cleaning up old files: {str(e)}")

def create_zip_file(files: list, output_path: str) -> str:
    """Create a ZIP file containing multiple files"""
    try:
        with zipfile.ZipFile(output_path, 'w') as zipf:
            for file_path in files:
                if os.path.exists(file_path):
                    zipf.write(
                        file_path, 
                        arcname=os.path.basename(file_path)
                    )
        return output_path
    except Exception as e:
        logger.error(f"Error creating ZIP file: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create ZIP file")