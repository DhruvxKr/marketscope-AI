import pandas as pd

from backend.config import (
    MARKET_METRICS_FILE,
    MARKET_SCORES_FILE
)


def load_market_metrics() -> pd.DataFrame:

    return pd.read_csv(MARKET_METRICS_FILE)


def load_market_scores() -> pd.DataFrame:

    return pd.read_csv(MARKET_SCORES_FILE)