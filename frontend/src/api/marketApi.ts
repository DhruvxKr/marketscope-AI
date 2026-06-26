import axios from "axios";
import type { Market } from "../types/market";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getMarkets = async (): Promise<Market[]> => {
    const response = await api.get("/markets");
    return response.data;
};