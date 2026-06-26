import pandas as pd

from backend.data.loader import load_market_scores


def get_all_markets() -> pd.DataFrame:

    return load_market_scores()


def get_market_by_city(city: str) -> pd.DataFrame:

    df =load_market_scores()
    match = df[df["city"].str.lower() == city.lower()]

    if match.empty:
        return None

    return match.iloc[0]



def get_top_markets(n: int = 10) -> pd.DataFrame:

    df = load_market_scores()

    return df.sort_values(
        by="expansion_score",
        ascending=False
    ).head(n)