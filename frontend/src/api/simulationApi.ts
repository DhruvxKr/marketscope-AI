import type { Market } from "../types/market";
import type { ScoreWeights } from "../types/weights";

const API = "http://127.0.0.1:8000";

export async function runSimulation(
  weights: ScoreWeights
): Promise<Market[]> {
  const response = await fetch(`${API}/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weights),
  });

  if (!response.ok) {
    throw new Error("Simulation failed");
  }

  return response.json();
}