import logging
from pathlib import Path

import pandas as pd

INPUT = Path("data/interim/city_features.csv")
OUTPUT = Path("data/final/market_metrics.csv")

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)


def load_city_features() -> pd.DataFrame:
    logging.info("Loading city features...")

    df = pd.read_csv(INPUT)

    logging.info(f"Loaded {len(df)} cities.")

    return df


def calculate_density_metrics(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    df["cafe_density"] = (
        df["cafes"] / df["population"] * 100000
    )

    df["university_density"] = (
        df["universities"] / df["population"] * 100000
    )

    df["mall_density"] = (
        df["malls"] / df["population"] * 100000
    )

    df["hotel_density"] = (
        df["hotels"] / df["population"] * 100000
    )

    return df


def save_metrics(df: pd.DataFrame) -> None:
    logging.info("Saving market metrics...")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    df.to_csv(OUTPUT, index=False)

    logging.info(f"Saved metrics to {OUTPUT}")


def main():
    df = load_city_features()

    df = calculate_density_metrics(df)

    save_metrics(df)

    logging.info("Market metrics calculated successfully.")


if __name__ == "__main__":
    main()