from langchain_core.messages import HumanMessage, AIMessage
from collections import defaultdict
from typing import Dict, List
from .config import settings

# session_id -> list of messages (HumanMessage / AIMessage)
_store: Dict[str, List] = defaultdict(list)


def get_history(session_id: str) -> List:
    h = _store[session_id]
    max_msgs = settings.max_history * 2  # user + AI = 1 turn

    return h[-max_msgs:] if len(h) > max_msgs else h


def append_turn(session_id: str, user: str, ai: str) -> None:
    _store[session_id].extend([
        HumanMessage(content=user),
        AIMessage(content=ai),
    ])


def clear_session(session_id: str) -> None:
    _store.pop(session_id, None)


def turn_count(session_id: str) -> int:
    return len(_store[session_id]) // 2