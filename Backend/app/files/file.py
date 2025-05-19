from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.auth.dependencies import get_current_user
from app.db.database import get_db
from app.models import User, File 

from .schemas import FileResponse  

router = APIRouter()

@router.get("/files", response_model=List[FileResponse])
def get_my_files(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    files = db.query(File).filter(File.user_id == current_user.id).order_by(File.created_at.desc()).all()
    return files
