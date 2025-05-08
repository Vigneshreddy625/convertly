import os
import logging
from typing import Optional
import pythoncom
from pdf2docx import Converter as PDFToDocxConverter
import pandas as pd
from tabula import read_pdf
import win32com.client
from pptx import Presentation
from openpyxl import load_workbook
import comtypes.client

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
    """Convert Word to PDF using Microsoft Word COM automation"""
    try:
        # Initialize COM objects
        pythoncom.CoInitialize()
        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False
        
        # Open the document
        doc = word.Documents.Open(word_path)
        
        # Save as PDF
        doc.SaveAs(output_path, FileFormat=17)  # 17 = PDF format
        
        # Close and cleanup
        doc.Close()
        word.Quit()
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"Word to PDF conversion failed: {str(e)}")
        return False
    finally:
        pythoncom.CoUninitialize()

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
    """Convert PowerPoint to PDF using Microsoft PowerPoint COM automation"""
    try:
        # Initialize COM objects
        pythoncom.CoInitialize()
        powerpoint = win32com.client.Dispatch("Powerpoint.Application")
        powerpoint.Visible = True
        
        # Open the presentation
        presentation = powerpoint.Presentations.Open(ppt_path)
        
        # Save as PDF
        presentation.SaveAs(output_path, 32)  # 32 = PDF format
        
        # Close and cleanup
        presentation.Close()
        powerpoint.Quit()
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"PowerPoint to PDF conversion failed: {str(e)}")
        return False
    finally:
        pythoncom.CoUninitialize()

def excel_to_pdf(excel_path: str, output_path: str) -> bool:
    """Convert Excel to PDF using Microsoft Excel COM automation"""
    try:
        # Initialize COM objects
        pythoncom.CoInitialize()
        excel = win32com.client.Dispatch("Excel.Application")
        excel.Visible = False
        
        # Open the workbook
        workbook = excel.Workbooks.Open(excel_path)
        
        # Save as PDF
        workbook.ExportAsFixedFormat(0, output_path)  # 0 = PDF format
        
        # Close and cleanup
        workbook.Close()
        excel.Quit()
        
        return os.path.exists(output_path)
    except Exception as e:
        logger.error(f"Excel to PDF conversion failed: {str(e)}")
        return False
    finally:
        pythoncom.CoUninitialize()