import logging

import pandas as pd

from backend.data.loader import load_market_metrics
from backend.models.schemas import ScoreWeights

def simulate(weights: ScoreWeights):
    df = load_market_metrics()

    df = calculate_scores(
        df,
        weights.model_dump()
    )

    return df.to_dict(orient="records")

def normalize_column(column: pd.Series) -> pd.Series:
    minimum = column.min()
    maximum = column.max()

    if maximum == minimum:
        return pd.Series(1.0, index=column.index)

    return (column - minimum) / (maximum - minimum)

def calculate_scores(
    df: pd.DataFrame,
    weights: dict[str, float]
) -> pd.DataFrame:
    df = df.copy()

    logging.info("Calculating expansion scores...")

    df["expansion_score"] = 0.0

    for column, weight in weights.items():

        normalized_column = normalize_column(df[column])

        score_column = f"{column}_score"

        df[score_column] = normalized_column

        df["expansion_score"] += normalized_column * weight

    # Convert score to a 0-100 scale
    df["expansion_score"] *= 100

    df = df.sort_values(
        by="expansion_score",
        ascending=False,
    ).reset_index(drop=True)

    df["rank"] = range(1, len(df) + 1)

    logging.info("Expansion scores calculated.")

    return df
