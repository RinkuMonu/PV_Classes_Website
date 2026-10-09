"""
database.py
───────────
Async MongoDB connection using Motor.
Reads MONGODB_URL and MONGODB_DB_NAME from .env
"""

import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL     = os.getenv("MONGODB_URL", "")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "pv_classes")

if not MONGODB_URL:
    raise RuntimeError(
        "MONGODB_URL is not set. "
        "Please add it to backend/.env\n"
        "Example: MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/"
    )

# Single client instance reused across all requests
_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(
            MONGODB_URL,
            serverSelectionTimeoutMS=5000,   # fail fast if unreachable
            connectTimeoutMS=5000,
        )
    return _client


async def get_db():
    """Return the database instance. Call this inside every route."""
    return get_client()[MONGODB_DB_NAME]


async def close_connection():
    """Call on app shutdown to cleanly close the connection pool."""
    global _client
    if _client is not None:
        _client.close()
        _client = None
