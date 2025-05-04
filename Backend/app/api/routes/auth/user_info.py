from fastapi import APIRouter, Depends

from app.models.auth import User
from app.core.auth_utils import get_current_active_user

router = APIRouter()

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    """
    Get information about the currently authenticated user.
    """
    return current_user