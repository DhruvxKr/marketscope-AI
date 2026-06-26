from backend.data.loader import load_market_metrics

df = load_market_metrics()

print(df.columns)