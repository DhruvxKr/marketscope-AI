from fastapi import APIRouter
from typing import List
from backend.models.schemas import Market
from backend.services.simulation_service import simulate
from backend.models.schemas import ScoreWeights

from backend.services.market_service import (
    get_all_markets,
    get_market_by_city,
    get_top_markets
)
from backend.models.schemas import Market, ScoreWeights
from backend.services.scoring_service import calculate_scores

router = APIRouter()

@router.post("/simulate")
def simulate_market(weights: ScoreWeights):
    return simulate(weights)

@router.get("/markets", response_model=List[Market])
def markets():
    df = get_all_markets()

    return df.to_dict(orient="records")

@router.get("/markets/{city}", response_model=Market)
def market(city: str):
    result = get_market_by_city(city)

    if result is None:
        return {"error": "City not found"}

    return result.to_dict()


@router.get("/top", response_model=List[Market])
def top_markets(n: int = 10):
    df = get_top_markets(n)

    return df.to_dict(orient="records")

@router.post("/score", response_model=list[Market])
def score_markets(weights: ScoreWeights):

    df = get_all_markets()

    result = calculate_scores(
        df,
        population_weight=weights.population,
        cafe_weight=weights.cafe_density,
        university_weight=weights.university_density,
        mall_weight=weights.mall_density,
        hotel_weight=weights.hotel_density,
    )

    return result.to_dict(orient="records")