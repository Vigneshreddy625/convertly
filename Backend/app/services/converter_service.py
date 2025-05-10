import os
import logging
from typing import Optional
import subprocess
from pdf2docx import Converter as PDFToDocxConverter
import pandas as pd
from tabula import read_pdf
from pptx import Presentation
from openpyxl import load_workbook

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def pdf_to_word(pdf_path: str, output_path: str) -> bool:
    """Convert PDF to Word document using pdf2docx"""
    try:
        # Convert PDF to DOCX
        converter = PDFToDocxConverter(pdf_path)
        converter.convert(output_path)
        converter.close()
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"PDF to Word conversion failed: {str(e)}")
        return False

def word_to_pdf(word_path: str, output_path: str) -> bool:
    """Convert Word to PDF using LibreOffice (headless)"""
    try:
        # Use LibreOffice to convert Word to PDF
        command = [
            "libreoffice", 
            "--headless", 
            "--convert-to", "pdf", 
            "--outdir", os.path.dirname(output_path), 
            word_path
        ]
        
        result = subprocess.run(command, capture_output=True, text=True)
        
        if result.returncode != 0:
            logger.error(f"LibreOffice conversion failed: {result.stderr}")
            return False
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"Word to PDF conversion failed: {str(e)}")
        return False

def pdf_to_powerpoint(pdf_path: str, output_path: str) -> bool:
    """Convert PDF to PowerPoint 
    Note: This is a simplified implementation using Python-PPTX
    For production, consider using a more robust solution or third-party API
    """
    try:
        # This is a placeholder implementation
        # In a real application, you would need a more robust solution
        
        # Create a simple PowerPoint presentation
        prs = Presentation()
        
        # Add slides with content from PDF
        # Note: Extracting content properly from PDF requires more sophisticated libraries
        # This is just a placeholder implementation
        slide_layout = prs.slide_layouts[1]  # Title and content layout
        slide = prs.slides.add_slide(slide_layout)
        
        title = slide.shapes.title
        title.text = "PDF Conversion"
        
        content = slide.placeholders[1]
        content.text = f"Converted from {os.path.basename(pdf_path)}"
        
        # Save the presentation
        prs.save(output_path)
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"PDF to PowerPoint conversion failed: {str(e)}")
        return False

def pdf_to_excel(pdf_path: str, output_path: str) -> bool:
    """Convert PDF to Excel using tabula-py"""
    try:
        # Extract tables from PDF
        tables = read_pdf(pdf_path, pages='all', multiple_tables=True)
        
        # Create Excel writer
        with pd.ExcelWriter(output_path) as writer:
            # Write each table to a separate sheet
            for i, table in enumerate(tables):
                table.to_excel(writer, sheet_name=f'Sheet{i+1}', index=False)
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"PDF to Excel conversion failed: {str(e)}")
        return False

def powerpoint_to_pdf(ppt_path: str, output_path: str) -> bool:
    """Convert PowerPoint to PDF using LibreOffice (headless)"""
    try:
        # Use LibreOffice to convert PowerPoint to PDF
        command = [
            "libreoffice", 
            "--headless", 
            "--convert-to", "pdf", 
            "--outdir", os.path.dirname(output_path), 
            ppt_path
        ]
        
        result = subprocess.run(command, capture_output=True, text=True)
        
        if result.returncode != 0:
            logger.error(f"LibreOffice conversion failed: {result.stderr}")
            return False
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"PowerPoint to PDF conversion failed: {str(e)}")
        return False

def excel_to_pdf(excel_path: str, output_path: str) -> bool:
    """Convert Excel to PDF using LibreOffice (headless)"""
    try:
        # Use LibreOffice to convert Excel to PDF
        command = [
            "libreoffice", 
            "--headless", 
            "--convert-to", "pdf", 
            "--outdir", os.path.dirname(output_path), 
            excel_path
        ]
        
        result = subprocess.run(command, capture_output=True, text=True)
        
        if result.returncode != 0:
            logger.error(f"LibreOffice conversion failed: {result.stderr}")
            return False
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"Excel to PDF conversion failed: {str(e)}")
        return False