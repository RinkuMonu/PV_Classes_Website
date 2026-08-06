"""
doubt_solver_router.py
──────────────────────
AI Doubt Solver — FastAPI router with MongoDB persistence.

Routes:
  POST   /api/ai-tutor/chat            → Ask a question (creates/continues session)
  GET    /api/ai-tutor/chat/history    → List all sessions (sidebar)
  GET    /api/ai-tutor/chat/{id}       → Get all messages of one session
  DELETE /api/ai-tutor/chat/{id}       → Delete a session

JSON contract (matches frontend DoubtSolverLayout exactly):
  Request  : { question, session_id?, subject? }
  Response : { success, session_id, messages, created_at }
  History  : { sessions: [{ session_id, title, created_at, updated_at }] }
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
import uuid
import os

# ── AI client (Groq preferred, falls back to OpenAI) ─────────────────────────
try:
    from groq import Groq
    _groq_client = Groq(api_key=os.getenv("GROQ_API_KEY", ""))
    USE_GROQ = bool(os.getenv("GROQ_API_KEY"))
except Exception:
    _groq_client = None
    USE_GROQ = False

import openai
openai.api_key = os.getenv("OPENAI_API_KEY", "")

# ── Database (imported from db.py) ────────────────────────────────────────────
from database import get_db

router = APIRouter(prefix="/api/ai-tutor", tags=["AI Doubt Solver"])


# ── Pydantic models ───────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    question: str
    session_id: Optional[str] = None
    subject: Optional[str] = None
    language: Optional[str] = "en"   # "hi" | "en"

class Message(BaseModel):
    role: str
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatResponse(BaseModel):
    success: bool
    session_id: str
    messages: List[Message]
    created_at: datetime

class SessionSummary(BaseModel):
    session_id: str
    title: str
    created_at: datetime
    updated_at: datetime

class HistoryResponse(BaseModel):
    sessions: List[SessionSummary]


# ── Helpers ───────────────────────────────────────────────────────────────────

def _make_title(question: str) -> str:
    """First 60 chars of the question as session title."""
    return question.strip()[:60] + ("…" if len(question) > 60 else "")


def _build_system_prompt(subject: Optional[str], language: str) -> str:
    lang_instr = (
        "Answer in Hindi (Devanagari script). Be clear and concise."
        if language == "hi"
        else "Answer in English. Be clear and concise."
    )
    subject_context = f" The student is studying for: {subject}." if subject else ""
    return (
        f"You are an expert AI tutor helping students prepare for Indian government exams "
        f"(SSC, KVS, NVS, RPSC, etc.).{subject_context} "
        f"Explain concepts step-by-step. {lang_instr}"
    )


async def _call_ai(messages_for_ai: list, subject: Optional[str], language: str) -> str:
    """Call Groq (fast) or OpenAI, return answer string."""
    system = _build_system_prompt(subject, language)
    payload = [{"role": "system", "content": system}] + messages_for_ai

    # ── Groq ──────────────────────────────────────────────────────────────────
    if USE_GROQ and _groq_client:
        try:
            resp = _groq_client.chat.completions.create(
                model="llama3-8b-8192",
                messages=payload,
                temperature=0.7,
                max_tokens=1024,
            )
            return resp.choices[0].message.content.strip()
        except Exception as groq_err:
            print(f"[Groq error] {groq_err} — falling back to OpenAI")

    # ── OpenAI fallback ───────────────────────────────────────────────────────
    try:
        resp = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=payload,
            temperature=0.7,
            max_tokens=1024,
        )
        return resp.choices[0].message.content.strip()
    except Exception as openai_err:
        raise HTTPException(
            status_code=503,
            detail=f"AI service unavailable: {openai_err}"
        )


# ── Route 1 : POST /api/ai-tutor/chat ─────────────────────────────────────────

@router.post("/chat", response_model=ChatResponse)
async def send_message(body: ChatRequest):
    """
    Ask a question. Creates a new session if session_id is not provided.
    Saves every message to MongoDB.
    """
    db = await get_db()
    sessions_col = db["doubt_sessions"]
    now = datetime.now(timezone.utc)

    # ── Load or create session ─────────────────────────────────────────────
    if body.session_id:
        doc = await sessions_col.find_one({"session_id": body.session_id})
        if not doc:
            raise HTTPException(status_code=404, detail="Session not found")
        session_id   = body.session_id
        messages_raw = doc.get("messages", [])
        created_at   = doc.get("created_at", now)
    else:
        session_id   = str(uuid.uuid4())
        messages_raw = []
        created_at   = now
        await sessions_col.insert_one({
            "session_id":  session_id,
            "title":       _make_title(body.question),
            "subject":     body.subject,
            "language":    body.language,
            "messages":    [],
            "created_at":  created_at,
            "updated_at":  created_at,
        })

    # ── Build message history for AI context ──────────────────────────────
    user_msg = {
        "role":      "user",
        "content":   body.question,
        "timestamp": now,
    }
    messages_raw.append(user_msg)

    # Only pass last 10 messages to keep context window manageable
    ai_context = [{"role": m["role"], "content": m["content"]}
                  for m in messages_raw[-10:]]

    # ── Call AI ───────────────────────────────────────────────────────────
    answer = await _call_ai(ai_context, body.subject, body.language or "en")

    ai_msg = {
        "role":      "assistant",
        "content":   answer,
        "timestamp": datetime.now(timezone.utc),
    }
    messages_raw.append(ai_msg)

    # ── Persist both messages to MongoDB ──────────────────────────────────
    await sessions_col.update_one(
        {"session_id": session_id},
        {"$set": {
            "messages":   messages_raw,
            "updated_at": datetime.now(timezone.utc),
        }},
    )

    # ── Return response ───────────────────────────────────────────────────
    return ChatResponse(
        success=True,
        session_id=session_id,
        messages=[Message(**m) for m in messages_raw],
        created_at=created_at,
    )


# ── Route 2 : GET /api/ai-tutor/chat/history ──────────────────────────────────

@router.get("/chat/history", response_model=HistoryResponse)
async def get_history():
    """
    Return all sessions sorted by most recent first.
    Used by the sidebar in DoubtSolverLayout.
    """
    db = await get_db()
    cursor = db["doubt_sessions"].find(
        {},
        {"session_id": 1, "title": 1, "created_at": 1, "updated_at": 1, "_id": 0},
    ).sort("updated_at", -1).limit(50)

    sessions = []
    async for doc in cursor:
        sessions.append(SessionSummary(
            session_id=doc["session_id"],
            title=doc.get("title", "Untitled"),
            created_at=doc.get("created_at", datetime.now(timezone.utc)),
            updated_at=doc.get("updated_at", datetime.now(timezone.utc)),
        ))

    return HistoryResponse(sessions=sessions)


# ── Route 3 : GET /api/ai-tutor/chat/{session_id} ─────────────────────────────

@router.get("/chat/{session_id}", response_model=ChatResponse)
async def get_session(session_id: str):
    """
    Return full message thread for one session.
    Called when user clicks a session in the sidebar.
    """
    db = await get_db()
    doc = await db["doubt_sessions"].find_one({"session_id": session_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Session not found")

    return ChatResponse(
        success=True,
        session_id=session_id,
        messages=[Message(**m) for m in doc.get("messages", [])],
        created_at=doc.get("created_at", datetime.now(timezone.utc)),
    )


# ── Route 4 : DELETE /api/ai-tutor/chat/{session_id} ─────────────────────────

@router.delete("/chat/{session_id}")
async def delete_session(session_id: str):
    """Delete an entire session and all its messages."""
    db = await get_db()
    result = await db["doubt_sessions"].delete_one({"session_id": session_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"success": True, "message": "Session deleted"}
