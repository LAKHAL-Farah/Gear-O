import re
from typing import List, Dict, Optional
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

from .config import settings
from .prompts import COACH_PROMPT
from .memory import get_history, append_turn


def _build_chain():
    llm = ChatOpenAI(
        api_key=settings.nim_api_key,
        base_url=settings.nim_base_url,
        model=settings.model_name,
        temperature=settings.temperature,
        max_tokens=settings.max_tokens,
    )
    return COACH_PROMPT | llm | StrOutputParser()


def _parse_mods(raw: str) -> List[Dict]:
    """Extract numbered mods from the PRIORITY MOD LIST section."""
    mods = []

    section = re.search(
        r"PRIORITY MOD LIST:(.*?)(?:BUDGET BREAKDOWN:|HONEST VERDICT:|$)",
        raw,
        re.DOTALL | re.IGNORECASE,
    )

    if not section:
        return mods

    for m in re.finditer(
        r"\d+\.\s+(.+?)\s+\u2014\s+(low|mid|high)\s+\u2014\s+([\w\u00a3\$\u20ac,\-\s]+)"
        r"\n\s+Why:\s+(.+?)\n\s+Watch out:\s+(.+?)(?=\n\d+\.|\Z)",
        section.group(1),
        re.DOTALL | re.IGNORECASE,
    ):
        mods.append({
            "name": m.group(1).strip(),
            "budget_tier": m.group(2).lower(),
            "cost_range": m.group(3).strip(),
            "reason": m.group(4).strip(),
            "watch_out": m.group(5).strip(),
            "insurance_flag": (
                "insurance" in m.group(5).lower()
                or "warranty" in m.group(5).lower()
            ),
        })

    return mods


def advise(
    car: str,
    goal: str,
    budget: str,
    existing_mods: Optional[str],
    follow_up: Optional[str],
    session_id: str,
) -> Dict:

    chain = _build_chain()
    history = get_history(session_id)

    # Turn 1: full context | Turn 2+: follow-up only
    user_msg = (
        follow_up
        if follow_up
        else (
            f"Car: {car}\n"
            f"Goal: {goal}\n"
            f"Budget: {budget}\n"
            f"Existing mods: {existing_mods or 'none'}"
        )
    )

    raw = chain.invoke({
        "user_text": user_msg,
        "history": history
    })

    append_turn(session_id, user_msg, raw)

    # Extract sections
    a = re.search(r"BUILD ASSESSMENT:\s*(.+?)(?=\nPRIORITY)", raw, re.DOTALL)
    v = re.search(r"HONEST VERDICT:\s*(.+?)$", raw, re.DOTALL | re.IGNORECASE)

    return {
        "raw_feedback": raw,
        "assessment": a.group(1).strip() if a else None,
        "mods": _parse_mods(raw),
        "verdict": v.group(1).strip() if v else None,
        "model_used": settings.model_name,
    }