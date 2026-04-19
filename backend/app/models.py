from pydantic import BaseModel, Field
from typing import Literal, Optional, List

BuildStyle = Literal["street", "track", "drift", "show"]


class ChatRequest(BaseModel):
    car: str = Field(..., description="Make, model, year, state")
    goal: str = Field(..., description="track / daily / drift / show")
    budget: str = Field(..., description="Budget e.g. £3,000")

    existing_mods: Optional[str] = None
    follow_up: Optional[str] = None  # set on turn 2+, skips car context

    session_id: str
    build_style: BuildStyle = "street"


class ModItem(BaseModel):
    name: str
    budget_tier: Literal["low", "mid", "high"]
    cost_range: str
    reason: str
    watch_out: str
    insurance_flag: bool = False


class AdvisorResponse(BaseModel):
    raw_feedback: str  # always present — never block on this

    assessment: Optional[str] = None
    mods: List[ModItem] = Field(default_factory=list)
    verdict: Optional[str] = None

    model_used: str