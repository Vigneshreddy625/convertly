from fastapi import APIRouter, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse
import os
from app.services.converter_service import word_to_pdf
from app.dependencies import save_upload_file
from app.config import settings
from app.utils.file_utils import delete_after_delay

router = APIRouter()

@router.post("/word-to-pdf")
async def convert_word_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Only Word files (DOC/DOCX) are accepted")

    file_path = await save_upload_file(file)
    output_filename = f"{os.path.splitext(os.path.basename(file_path))[0]}.pdf"
    output_path = os.path.join(settings.OUTPUT_DIR, output_filename)

    if not word_to_pdf(file_path, output_path):
        raise HTTPException(status_code=500, detail="Conversion failed")

    background_tasks.add_task(delete_after_delay, file_path)
    background_tasks.add_task(delete_after_delay, output_path)

    return FileResponse(
        path=output_path,
        filename=f"{os.path.splitext(file.filename)[0]}.pdf",
        media_type="application/pdf"
    )
