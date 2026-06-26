import { useEffect, useState } from "react";
import { getMarkets } from "../api/marketApi";
import type { Market } from "../types/market";

export function useMarkets() {
    const [markets, setMarkets] = useState<Market[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMarkets()
            .then(setMarkets)
            .finally(() => setLoading(false));
    }, []);

    return { markets, loading };
}