# backend/app/main.py

import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .models import ChatRequest, AdvisorResponse
from .coach import advise
from .memory import clear_session, turn_count

app = FastAPI(title="AI Mechanic API", version="1.0.0")


# Handle CORS origins safely
origins = (
    settings.cors_origins.split(",")
    if isinstance(settings.cors_origins, str)
    else settings.cors_origins
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "model": settings.model_name}


@app.post("/new-session")
def new_session():
    return {"session_id": str(uuid.uuid4())}


@app.post("/chat", response_model=AdvisorResponse)
def chat(req: ChatRequest):
    try:
        result = advise(
            car=req.car,
            goal=req.goal,
            budget=req.budget,
            existing_mods=req.existing_mods,
            follow_up=req.follow_up,
            session_id=req.session_id,
        )
        return AdvisorResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/session/{session_id}")
def session_info(session_id: str):
    return {
        "session_id": session_id,
        "turns": turn_count(session_id),
    }


@app.delete("/session/{session_id}")
def delete_session(session_id: str):
    clear_session(session_id)
    return {"deleted": session_id}