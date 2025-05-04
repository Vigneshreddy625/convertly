from fastapi import APIRouter
from app.api.routes.auth import register, token, user_info, login, logout

router = APIRouter(prefix="/auth", tags=["authentication"])
router.include_router(register.router)
router.include_router(token.router)
router.include_router(user_info.router)
router.include_router(login.router)
router.include_router(logout.router)