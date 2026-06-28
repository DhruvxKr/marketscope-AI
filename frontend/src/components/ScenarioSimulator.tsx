import Slider from "./Slider";
import type { ScoreWeights } from "../types/weights";

interface Props {
    weights: {
        population: number;
        cafe_density: number;
        university_density: number;
        mall_density: number;
        hotel_density: number;
    };

    setWeights: React.Dispatch<
        React.SetStateAction<{
            population: number;
            cafe_density: number;
            university_density: number;
            mall_density: number;
            hotel_density: number;
        }>
    >;

    onRunSimulation: () => void;
    onManualChange: () => void;
}

function ScenarioSimulator({
  weights,
  setWeights,
  onRunSimulation,
  onManualChange,
}: Props) {
function    handleChange(
    key: keyof ScoreWeights,
    value: number
) {
    onManualChange();

    setWeights({
        ...weights,
        [key]: value,
    });
}
  const totalWeight = Object.values(weights).reduce(
  (sum, value) => sum + value,
  0
);

  return (
    <div className="rounded-xl border border-[#E8E4DE] bg-white p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Scenario Simulator
      </h2>

      {Object.entries(weights).map(([key, value]) => (
        <div key={key} className="mb-6">
          <div className="mb-2 flex justify-between">
            <span className="capitalize">
              {key.replace("_", " ")}
            </span>

            <span className="font-semibold text-[#8A5A14]">
              {(value * 100).toFixed(0)}%
            </span>
          </div>

          <Slider
            value={value}
            onChange={(newValue) =>
              handleChange(
                key as keyof ScoreWeights,
                newValue
              )
            }
          />
        </div>
      ))}
<div className="mb-6 rounded-lg border border-[#E8E4DE] bg-[#FAFAF8] p-4">
    <div className="flex justify-between">
        <span className="font-medium">
            Total Weight
        </span>

        <span
            className={`font-semibold ${
                Math.abs(totalWeight - 1) < 0.001
                    ? "text-green-700"
                    : "text-[#8A5A14]"
            }`}
        >
            {(totalWeight * 100).toFixed(0)}%
        </span>
    </div>

    <p className="mt-2 text-sm text-[#6B6560]">
        Weights will be normalized automatically before simulation.
    </p>
</div>
<button
  onClick={onRunSimulation}
  className="
    w-full
    rounded-lg
    bg-[#8A5A14]
    py-3
    font-semibold
    text-white
    transition
    hover:bg-[#734A10]
  "
>
  Run Simulation
</button>
    </div>
  );
}

export default ScenarioSimulator;