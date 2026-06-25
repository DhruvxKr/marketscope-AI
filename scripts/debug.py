import pandas as pd
from unidecode import unidecode
import json

df = pd.read_csv("data/raw/cities.csv")

print("=== Kanpur Records ===")
print(df[df["city"].str.contains("Kanpur", case=False, na=False)])

with open("config/market_universe.json", "r") as f:
    config = json.load(f)

target = {
    unidecode(city).strip()
    for city in config["market_universe"]
}

available = {
    unidecode(city).strip()
    for city in df["city"]
}

print("\n=== Missing Cities ===")
print(sorted(target - available))

for city in sorted(df["city"].apply(unidecode).unique()):
    if city.lower().startswith(("ban", "gur", "mys", "vis", "nas", "bhu", "noi", "vij")):
        print(city)

search_terms = [
    "bang",
    "guru",
    "gurg",
    "mys",
    "bhub",
    "noi",
    "gautam",
    "greater"
]

print("\n=== Possible Matches ===")

for term in search_terms:
    print(f"\nSearching for '{term}'")
    matches = df[
        df["city"]
        .apply(unidecode)
        .str.lower()
        .str.contains(term)
    ]

    print(matches[["city", "admin_name"]])

print(df.sort_values("population", ascending=False)[["city", "admin_name", "population"]].head(50))