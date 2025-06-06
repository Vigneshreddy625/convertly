from fastapi import Depends, APIRouter, HTTPException
from app.auth.dependencies import get_current_user
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.db.database import get_db
from app.models import User, Info
from .schemas import InfoResponse, InfoUpdate, InfoCreate

router = APIRouter()

@router.get("/userinfo/me", response_model=InfoResponse)
def get_user_info(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_info = db.query(Info).filter(Info.user_id == current_user.id).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User info not found")
    return user_info

@router.post("/userinfo/me", response_model=InfoResponse)
def create_user_info(info: InfoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    existing_info = db.query(Info).filter(Info.user_id == current_user.id).first()
    if existing_info:
        raise HTTPException(status_code=400, detail="User info already exists")
    new_info = Info(user_id=current_user.id, **info.dict())
    db.add(new_info)
    db.commit()
    db.refresh(new_info)
    return new_info

@router.put("/userinfo/me", response_model=InfoResponse)
def update_user_info(info: InfoUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_info = db.query(Info).filter(Info.user_id == current_user.id).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User info not found")
    for key, value in info.dict(exclude_unset=True).items():
        setattr(user_info, key, value)
    db.commit()
    db.refresh(user_info)
    return user_info