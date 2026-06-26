import {
  Building2,
  BarChart3,
  Trophy,
  ShieldCheck,
} from "lucide-react";
import type { Market } from "../types/market";

interface Props {
  markets: Market[];
}

function KPICards({ markets }: Props) {
    if (markets.length === 0) {
  return null;
}
  const totalCities = markets.length;

  const averageScore =
    markets.reduce((sum, city) => sum + city.expansion_score, 0) /
    totalCities;

    const topMarket = markets.reduce(
    (best, city) => (city.rank < best.rank ? city : best),
    markets[0]
    );

  const cards = [
    {
      title: "Total Cities",
      value: totalCities,
      subtitle: "Analyzed Markets",
      icon: Building2,
    },
    {
      title: "Average Expansion Score",
      value: averageScore.toFixed(1),
      subtitle: "/100",
      icon: BarChart3,
    },
    {
      title: "Top Ranked Market",
      value: topMarket.city,
      subtitle: `Score: ${topMarket.expansion_score.toFixed(1)}`,
      icon: Trophy,
    },
    {
      title: "Model Confidence",
      value: "92%",
      subtitle: "Scoring Model",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
                rounded-xl
                border
                border-[#E8E4DE]
                bg-white
                p-6
                transition-all
                duration-200
                hover:shadow-md
                hover:-translate-y-1
            "
            >
            <div className="flex justify-between items-start">

              <div>
                <p className="text-sm text-[#6B6560]">
                  {card.title}
                </p>

                <h2 className="mt-4 text-4xl font-bold text-[#8A5A14]">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-[#6B6560]">
                  {card.subtitle}
                </p>
              </div>

              <Icon
                size={24}
                className="text-[#8A5A14]"
              />

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default KPICards;