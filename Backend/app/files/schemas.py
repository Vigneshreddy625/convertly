from pydantic import BaseModel
from datetime import datetime

class FileResponse(BaseModel):
    id: int
    filename: str
    output_filename: str
    storage_url: str
    created_at: datetime

    class Config:
        orm_mode = True
