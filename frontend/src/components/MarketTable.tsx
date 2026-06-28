import type { Market } from "../types/market";
import { formatPopulation } from "../utils/format";

interface Props {
  markets: Market[];
}

function MarketTable({ markets }: Props) {
  return (
    <div className="mt-8 rounded-xl border border-[#E8E4DE] bg-white">

      <div className="flex items-center justify-between border-b border-[#E8E4DE] p-6">
        <h2 className="text-xl font-semibold text-[#1A1714]">
          Market Intelligence Comparison
        </h2>

        <button className="rounded-lg border border-[#E8E4DE] px-4 py-2 text-sm hover:bg-[#FAFAF8] transition">
          Export
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-[#FAFAF8]">
          <tr className="text-left text-sm text-[#6B6560]">

            <th className="px-6 py-4">Rank</th>
            <th className="px-6 py-4">City</th>
            <th className="px-6 py-4">State</th>
            <th className="px-6 py-4">Population</th>
            <th className="px-6 py-4">Expansion Index</th>

          </tr>
        </thead>

        <tbody>

          {markets.map((market) => (

            <tr
              key={market.city}
              className="border-t border-[#E8E4DE] hover:bg-[#FAFAF8] transition cursor-pointer"
            >

              <td className="px-6 py-4 font-medium">
                #{market.rank}
              </td>

              <td className="px-6 py-4 font-semibold">
                {market.city}
              </td>

              <td className="px-6 py-4">
                {market.state}
              </td>

              <td className="px-6 py-4">
                {formatPopulation(market.population)}
                </td>

              <td className="px-6 py-4 font-semibold text-[#8A5A14]">
                {market.expansion_score.toFixed(1)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MarketTable;