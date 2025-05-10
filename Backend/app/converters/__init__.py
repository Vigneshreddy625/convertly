from fastapi import APIRouter
from app.converters import (
    excel_to_pdf,
    pdf_to_excel,
    pdf_to_ppt,
    pdf_to_word,
    word_to_pdf,
    ppt_to_pdf,
)

router = APIRouter(prefix="/converters", tags=["converters"])
router.include_router(pdf_to_word.router)
router.include_router(word_to_pdf.router)
router.include_router(pdf_to_ppt.router)
router.include_router(pdf_to_excel.router)
router.include_router(ppt_to_pdf.router)
router.include_router(excel_to_pdf.router)
