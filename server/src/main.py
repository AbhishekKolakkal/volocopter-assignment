# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import mission  # Import the mission router

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the mission router
app.include_router(mission.router, prefix="/api/v1")
