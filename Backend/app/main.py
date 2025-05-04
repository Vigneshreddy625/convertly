from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.converters import router as converters_router  
from app.api.routes.auth import router as auth_router
from app.config import settings  

app = FastAPI(
    title="Document Converter API",
    description="API for converting various document formats",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(converters_router)
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Document Converter API"}
