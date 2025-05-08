from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True

    class Config:
        orm_mode = True  # Allows Pydantic model to work with SQLAlchemy models

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    created_at: Optional[datetime]  # Use datetime directly here

    class Config:
        orm_mode = True  # Ensures that SQLAlchemy model is compatible with Pydantic model
