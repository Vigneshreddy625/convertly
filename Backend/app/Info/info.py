from fastapi import Depends, APIRouter, HTTPException
from app.auth.dependencies import get_current_user
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.db.database import get_db
from app.models import User, Info
from .schemas import InfoResponse, InfoUpdate

router = APIRouter()

router = APIRouter()

@router.get("/me", response_model=InfoResponse)
def get_user_info(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_info = db.query(Info).filter(Info.user_id == current_user.id).first()
    if not user_info:
        raise HTTPException(status_code=404, detail="User info not found")

    response = InfoResponse(
        id=user_info.id,
        user_id=user_info.user_id,
        full_name=current_user.full_name,
        address=user_info.address,
        age=user_info.age,
        phone=user_info.phone,
        avatar=user_info.avatar,
        bio=user_info.bio,
        created_at=user_info.created_at,
        updated_at=user_info.updated_at,
    )
    return response

@router.patch("/me", response_model=InfoResponse)
def update_user_info(info: InfoUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_info = db.query(Info).filter(Info.user_id == current_user.id).first()

    if not user_info:
        user_info = Info(user_id=current_user.id)
        db.add(user_info)
        db.commit()
        db.refresh(user_info)

    for key, value in info.dict(exclude_unset=True).items():
        setattr(user_info, key, value)

    db.commit()
    db.refresh(user_info)

    response = InfoResponse(
        id=user_info.id,
        user_id=user_info.user_id,
        full_name=current_user.full_name,
        address=user_info.address,
        age=user_info.age,
        phone=user_info.phone,
        avatar=user_info.avatar,
        bio=user_info.bio,
        created_at=user_info.created_at,
        updated_at=user_info.updated_at,
    )
    return response