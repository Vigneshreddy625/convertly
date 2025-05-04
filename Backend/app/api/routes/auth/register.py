from fastapi import APIRouter, HTTPException, status

from app.models.auth import User, UserCreate
from app.core.auth_utils import get_password_hash
from app.core.auth_config import fake_users_db

router = APIRouter()

@router.post("/register", response_model=User)
async def register_user(user: UserCreate):
    """
    Register a new user in the system.
    """
    if user.username in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    hashed_password = get_password_hash(user.password)
    user_data = user.dict()
    del user_data["password"]
    user_data["hashed_password"] = hashed_password
    user_data["disabled"] = False
    fake_users_db[user.username] = user_data
    return user_data