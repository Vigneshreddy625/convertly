from fastapi import APIRouter, Depends
from app.core.auth_utils import get_current_user
from app.core.auth_config import oauth2_scheme
from app.core.token_blacklist import token_blacklist

router = APIRouter()

@router.post("/logout")
async def logout_user(token: str = Depends(oauth2_scheme)):
    """
    Invalidate the current JWT access token by blacklisting it.
    """
    token_blacklist.add(token)
    return {"msg": "Successfully logged out"}
