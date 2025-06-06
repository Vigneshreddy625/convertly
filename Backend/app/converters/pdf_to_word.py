from fastapi import APIRouter, UploadFile, File, BackgroundTasks, HTTPException, Depends
from fastapi.responses import FileResponse
import os
from app.services.converter_service import pdf_to_word
from app.db.database import get_db
from app.core.dependencies import save_upload_file
from app.auth.dependencies import get_current_user_optional
from app.core.config import settings
from app.utils.file_utils import delete_after_delay
from supabase import create_client
from uuid import uuid4
from sqlalchemy.orm import Session
from typing import Optional
from app.models import User

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

router = APIRouter()

@router.post("/pdf-to-word")
async def convert_pdf_to_word(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """
    Convert PDF to Word document.
    Works for both authenticated and unauthenticated users.
    Only stores conversion history for authenticated users.
    """
    try:
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted")

        original_filename = file.filename
        original_name_without_ext = os.path.splitext(original_filename)[0]
        
        file_path = await save_upload_file(file)
        output_filename = f"{original_name_without_ext}.docx"
        output_path = os.path.join(settings.OUTPUT_DIR, output_filename)

        if not pdf_to_word(file_path, output_path):
            raise HTTPException(status_code=500, detail="Conversion failed")

        if current_user:
            try:
                from app.models import File as DBFile
                
                unique_id = str(uuid4())
                storage_filename = f"{unique_id}_{output_filename}"
                
                with open(output_path, "rb") as f:
                    storage_response = supabase.storage.from_("convertedfiles").upload(storage_filename, f)
                
                if not storage_response:
                    raise HTTPException(status_code=500, detail="Failed to upload file to storage")
                
                file_url = f"{settings.SUPABASE_STORAGE_URL}/convertedfiles/{storage_filename}"
                
                db_file = DBFile(
                    user_id=current_user.id,
                    filename=original_filename,       
                    output_filename=output_filename,  
                    storage_path=storage_filename,    
                    storage_url=file_url
                )
                
                db.add(db_file)
                db.commit()
                db.refresh(db_file)
                
                print(f"File saved to database with ID: {db_file.id} for user: {current_user.id}")
            except Exception as e:
                db.rollback()  
                print(f"Error saving file to database: {str(e)}")
        else:
            print("User not authenticated, skipping database storage")

        background_tasks.add_task(delete_after_delay, file_path)
        background_tasks.add_task(delete_after_delay, output_path)

        return FileResponse(
            path=output_path,
            filename=output_filename,  
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        print(f"Error in PDF to Word conversion: {str(e)}")
        if 'file_path' in locals():
            background_tasks.add_task(delete_after_delay, file_path)
        if 'output_path' in locals():
            background_tasks.add_task(delete_after_delay, output_path)
        raise HTTPException(status_code=500, detail=f"Conversion process failed: {str(e)}")