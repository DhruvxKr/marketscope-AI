import logging
from pathlib import Path

import pandas as pd
from backend.services.simulation_service import calculate_scores

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


def save_scores(df: pd.DataFrame) -> None:
    logging.info("Saving market scores...")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    df.to_csv(OUTPUT, index=False)

    logging.info(f"Scores saved to {OUTPUT}")


def main():
    df = load_metrics()

    df = calculate_scores(df, WEIGHTS)

    save_scores(df)

    logging.info("Market scoring completed successfully.")


if __name__ == "__main__":
    main()