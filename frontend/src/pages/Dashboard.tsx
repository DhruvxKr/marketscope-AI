import { useEffect, useState } from "react";
import { runSimulation } from "../api/simulationApi";

import DashboardLayout from "../components/DashboardLayout";
import KPICards from "../components/KPICards";
import MarketTable from "../components/MarketTable";
import ScenarioSimulator from "../components/ScenarioSimulator";

import { useMarkets } from "../hooks/useMarkets";

import type { ScoreWeights } from "../types/weights";

function Dashboard() {
  const {
    markets: initialMarkets,
    loading,
    error,
  } = useMarkets();

  const [markets, setMarkets] = useState(initialMarkets);

  useEffect(() => {
    setMarkets(initialMarkets);
  }, [initialMarkets]);

  const [weights, setWeights] = useState<ScoreWeights>({
    population: 0.40,
    cafe_density: 0.20,
    university_density: 0.15,
    mall_density: 0.15,
    hotel_density: 0.10,
  });

  const handleRunSimulation = async () => {
    try {
      const total = Object.values(weights).reduce(
        (sum, value) => sum + value,
        0
      );

      const normalizedWeights = {
        population: weights.population / total,
        cafe_density: weights.cafe_density / total,
        university_density: weights.university_density / total,
        mall_density: weights.mall_density / total,
        hotel_density: weights.hotel_density / total,
      };

      const updatedMarkets = await runSimulation(normalizedWeights);
      setMarkets(updatedMarkets);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <DashboardLayout>
      <KPICards markets={markets} />

      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <MarketTable markets={markets} />
        </div>

        <ScenarioSimulator
          weights={weights}
          setWeights={setWeights}
          onRunSimulation={handleRunSimulation}
        />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;