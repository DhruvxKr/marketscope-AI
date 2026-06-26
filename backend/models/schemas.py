from pydantic import BaseModel, Field, model_validator


class Market(BaseModel):
    city: str
    state: str
    latitude: float
    longitude: float
    population: int
    is_state_capital: int
    cafes: int
    universities: int
    malls: int
    hotels: int
    airports: int

    cafe_density: float
    university_density: float
    mall_density: float
    hotel_density: float

    expansion_score: float

    population_score: float
    cafe_density_score: float
    mall_density_score: float
    university_density_score: float
    hotel_density_score: float

    rank: int

class ScoreWeights(BaseModel):
    population: float = Field(ge=0, le=1)
    cafe_density: float = Field(ge=0, le=1)
    university_density: float = Field(ge=0, le=1)
    mall_density: float = Field(ge=0, le=1)
    hotel_density: float = Field(ge=0, le=1)

    @model_validator(mode="after")
    def validate_weights(self):
        total = (
            self.population
            + self.cafe_density
            + self.university_density
            + self.mall_density
            + self.hotel_density
        )

        if abs(total - 1.0) > 1e-6:
            raise ValueError("Weights must sum to 1.")

        return self