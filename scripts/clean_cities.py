import json
import logging
from pathlib import Path

import pandas as pd
from unidecode import unidecode

RAW_DATA = Path("data/raw/cities.csv")
CONFIG = Path("config/market_universe.json")
OUTPUT = Path("data/processed/market_universe.csv")


logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

CITY_COLUMN = "city"
STATE_COLUMN ="admin_name"
LAT_COLUMN = "lat"
LNG_COLUMN = "lng"
POPULATION_COLUMN = "population"
CAPITAL_COLUMN = "capital"

def load_config() -> set[str]:
    logging.info("Loading market universe...")
    with open(CONFIG, "r", encoding="utf-8") as file:
        config=json.load(file)

    cities = config["market_universe"]
    logging.info(f"Loaded {len(cities)} target cities.")
    return {unidecode(city).strip() for city in cities}

def load_city_data() -> pd.DataFrame:
    logging.info("Loading city dataset...")
    df = pd.read_csv(RAW_DATA)
    logging.info(f"Loaded {len(df)} cities.")
    return df

def normalize_city_names(df:pd.DataFrame) ->pd.DataFrame:
    df=df.copy()
    logging.info("Normalizing city and state names...")
    df[CITY_COLUMN] = (
        df[CITY_COLUMN].apply(unidecode).str.strip()
    )
    df[STATE_COLUMN] = (
        df[STATE_COLUMN].apply(unidecode).str.strip()
    )
    logging.info("Normalization complete")
    return df

def filter_market_universe(df:pd.DataFrame, target_cities: set[str])->pd.DataFrame:
    df=df.copy()
    logging.info("Filtering market universe...")
    df = df[df[CITY_COLUMN].isin(target_cities)]
    logging.info(f"Retained {len(df)} target cities.")
    return df

def remove_duplicates(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    logging.info("Removing known incorrect records...")

    # Remove incorrect Kanpur record from Gujarat
    df = df[
        ~(
            (df[CITY_COLUMN] == "Kanpur") &
            (df[STATE_COLUMN] == "Gujarat")
        )
    ]

    logging.info("Sorting cities by population...")
    df = df.sort_values(by=POPULATION_COLUMN, ascending=False)

    logging.info("Removing duplicate city records...")
    df = df.drop_duplicates(subset=[CITY_COLUMN], keep="first")

    logging.info(f"Retained {len(df)} unique cities.")

    return df

def select_and_rename_columns(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    logging.info("Selecting required columns...")

    df = df[
        [
            CITY_COLUMN,
            STATE_COLUMN,
            LAT_COLUMN,
            LNG_COLUMN,
            POPULATION_COLUMN,
            CAPITAL_COLUMN,
        ]
    ]

    logging.info("Converting capital information...")

    df["is_state_capital"] = (
        df[CAPITAL_COLUMN]
        .fillna("")
        .isin(["admin", "primary"])
    )

    df = df.drop(columns=[CAPITAL_COLUMN])

    logging.info("Renaming columns...")

    df = df.rename(
        columns={
            STATE_COLUMN: "state",
            LAT_COLUMN: "latitude",
            LNG_COLUMN: "longitude",
        }
    )
    df = df.sort_values(by="city").reset_index(drop=True)

    logging.info("Column selection and renaming complete.")

    return df

def save_dataset(df:pd.DataFrame)->None:
    logging.info("Saving processed dataset...")
    OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    df.to_csv(OUTPUT,index=False)
    logging.info(f"Dataset saved to {OUTPUT}")

def main():
    target_cities = load_config()

    df = load_city_data()

    df = normalize_city_names(df)

    df = filter_market_universe(df, target_cities)

    df = remove_duplicates(df)

    df = select_and_rename_columns(df)

    df["population"] = df["population"].astype(int)

    save_dataset(df)

    logging.info("City cleaning pipeline completed successfully.")
    logging.info(f"Final market universe contains {len(df)} cities.")

if __name__ == "__main__":
    main()