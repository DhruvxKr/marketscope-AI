import logging
from pathlib import Path

import osmnx as ox
import pandas as pd
import time

INPUT = Path("data/processed/market_universe.csv")
OUTPUT = Path("data/interim/city_features.csv")

FEATURE_TAGS={
    "cafes": ("amenity", "cafe"),
    "universities": ("amenity", "university"),
    "malls": ("shop", "mall"),
    "hotels": ("tourism", "hotel"),
    "airports": ("aeroway", "aerodrome"),
}
OSM_TAGS = {
    "amenity": ["cafe", "university"],
    "shop": ["mall"],
    "tourism": ["hotel"],
    "aeroway": ["aerodrome"],
}

SEARCH_RADIUS = 15000
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

def load_market_universe() -> pd.DataFrame:
    logging.info("Loading market universe...")
    df = pd.read_csv(INPUT)
    logging.info(f"Loaded {len(df)} markets.")
    return df

def count_features(pois:pd.DataFrame)->dict:
    features={}
    for feature_name,(column,value) in FEATURE_TAGS.items():
        if column in pois.columns:
            features[feature_name]=(pois[column]==value).sum()
        else:
            features[feature_name]=0
    return features


def fetch_features_for_city(city: str, lat: float, lon: float,)->dict:
    logging.info(f"Fetching features for {city}...")

    pois = ox.features_from_point(
        center_point=(lat,lon),
        tags=OSM_TAGS,
        dist=SEARCH_RADIUS,
    )
    features = count_features(pois)
    features["city"]=city
    return features
    

def save_features(df: pd.DataFrame) -> None:
    logging.info("Saving city features dataset...")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    df.to_csv(OUTPUT, index=False)

    logging.info(f"City features saved to {OUTPUT}")


def main():
    market_universe = load_market_universe()

    all_features = []

    for _, city in market_universe.iterrows():
        try:
            features = fetch_features_for_city(
                city=city["city"],
                lat=city["latitude"],
                lon=city["longitude"],
            )

            all_features.append(features)
            time.sleep(1)

        except Exception as e:
            logging.error(f"{city['city']} failed: {e}")
        
    features_df = pd.DataFrame(all_features)

    master_df = market_universe.merge(
        features_df,
        on="city",
        how="left",
    )


    save_features(master_df)

    logging.info("OSM feature extraction completed successfully.")

if __name__ == "__main__":
    main()