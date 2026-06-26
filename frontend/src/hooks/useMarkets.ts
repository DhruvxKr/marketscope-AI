import { useEffect, useState } from "react";
import { getMarkets } from "../api/marketApi";
import type { Market } from "../types/market";

export function useMarkets() {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMarkets()
            .then(setMarkets)
            .catch(() => setError("Failed to load market data."))
            .finally(() => setLoading(false));
    }, []);

    return { markets, loading, error };
}