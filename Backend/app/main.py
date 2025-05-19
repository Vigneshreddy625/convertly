from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.db.database import engine, Base
from app.auth.router import router as auth_router
from app.converters import router as converters_router
from app.files.file import router as files_router
import app.models 

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="FastAPI with PostgreSQL",
    description="FastAPI application with PostgreSQL integration and authentication",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://convertly-silk.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(converters_router, tags=["converters"]) 
app.include_router(files_router, tags=["files"])

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI with PostgreSQL"}
