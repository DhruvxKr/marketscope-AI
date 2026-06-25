import logging
from pathlib import Path

import pandas as pd

INPUT = Path("data/final/market_metrics.csv")
OUTPUT = Path("data/final/market_scores.csv")

WEIGHTS = {
    "population": 0.45,
    "cafe_density": 0.25,
    "mall_density": 0.20,
    "university_density": 0.15,
    "hotel_density": 0.10,
}

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)


def load_metrics() -> pd.DataFrame:
    logging.info("Loading market metrics...")

    df = pd.read_csv(INPUT)

    logging.info(f"Loaded {len(df)} cities.")

    return df


def normalize_column(column: pd.Series) -> pd.Series:
    minimum = column.min()
    maximum = column.max()

    if maximum == minimum:
        return pd.Series(1.0, index=column.index)

    return (column - minimum) / (maximum - minimum)


def calculate_expansion_score(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    logging.info("Calculating expansion scores...")

    df["expansion_score"] = 0.0

    for column, weight in WEIGHTS.items():

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


def save_scores(df: pd.DataFrame) -> None:
    logging.info("Saving market scores...")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    df.to_csv(OUTPUT, index=False)

    logging.info(f"Scores saved to {OUTPUT}")


def main():
    df = load_metrics()

    df = calculate_expansion_score(df)

    save_scores(df)

    logging.info("Market scoring completed successfully.")


if __name__ == "__main__":
    main()