import pandas as pd


def calculate_scores(
    df: pd.DataFrame,
    population_weight: float,
    cafe_weight: float,
    university_weight: float,
    mall_weight: float,
    hotel_weight: float,
) -> pd.DataFrame:

    result = df.copy()

    result["expansion_score"] = (
        result["population_score"] * population_weight
        + result["cafe_density_score"] * cafe_weight
        + result["university_density_score"] * university_weight
        + result["mall_density_score"] * mall_weight
        + result["hotel_density_score"] * hotel_weight
    )

    result = result.sort_values(
        by="expansion_score",
        ascending=False
    ).reset_index(drop=True)

    result["rank"] = result.index + 1

    return result