import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base
from app.auth.router import router as auth_router
import app.models

# Create the FastAPI app
app = FastAPI(
    title="FastAPI with PostgreSQL",
    description="FastAPI application with PostgreSQL integration and authentication",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create database tables if they don't exist
@app.on_event("startup")
async def startup():
    Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["authentication"])

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI with PostgreSQL"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)