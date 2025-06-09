from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class InfoResponse(BaseModel):
    id: int
    user_id: int
    username: str
    full_name: Optional[str] = None  
    address: Optional[str] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class InfoUpdate(BaseModel):
    address: Optional[str] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        orm_mode = True
        extra = "forbid"
