# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import mission, mission_state  # Import the mission router
from .database import create_tables


app = FastAPI()

create_tables()

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


app.include_router(mission_state.router, prefix="/api/v1")
