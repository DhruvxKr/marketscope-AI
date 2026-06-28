import type { ScoreWeights } from "./weights";

export interface BusinessPreset {
  id: string;
  name: string;
  description: string;
  weights: ScoreWeights;
}