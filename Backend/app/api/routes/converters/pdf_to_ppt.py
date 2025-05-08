from fastapi import APIRouter, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse
import os
from app.services.converter_service import pdf_to_powerpoint
from app.core.dependencies import save_upload_file
from app.core.config import settings
from app.utils.file_utils import delete_after_delay

router = APIRouter()

@router.post("/pdf-to-powerpoint")
async def convert_pdf_to_powerpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
):
    """Convert PDF to PowerPoint presentation"""
    try:
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted")

        file_path = await save_upload_file(file)
        output_filename = f"{os.path.splitext(os.path.basename(file_path))[0]}.pptx"
        output_path = os.path.join(settings.OUTPUT_DIR, output_filename)

        if not pdf_to_powerpoint(file_path, output_path):
            raise HTTPException(status_code=500, detail="Conversion failed")

        background_tasks.add_task(delete_after_delay, file_path)
        background_tasks.add_task(delete_after_delay, output_path)

        return FileResponse(
            path=output_path,
            filename=f"{os.path.splitext(file.filename)[0]}.pptx",
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
