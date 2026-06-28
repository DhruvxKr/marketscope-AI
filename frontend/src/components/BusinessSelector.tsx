import {
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  Hotel,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react";

import type { BusinessPreset } from "../types/business";

import { BUSINESS_PRESETS } from "../data/businessPresets";
import type { ScoreWeights } from "../types/weights";

interface Props {
  selectedBusiness: string;
  onSelectBusiness: (preset: BusinessPreset) => void;
}

const icons = {
  coffee: Coffee,
  restaurant: UtensilsCrossed,
  retail: ShoppingBag,
  hotel: Hotel,
  university: GraduationCap,
  custom: SlidersHorizontal,
};

function BusinessSelector({
    selectedBusiness,
    onSelectBusiness,
}: Props) {
  return (
    <div className="rounded-xl border border-[#E8E4DE] bg-white p-6">

      <h2 className="mb-5 text-xl font-semibold">
        Business Profile
      </h2>

      <div className="space-y-3">

        {BUSINESS_PRESETS.map((preset) => {

          const Icon =
            icons[preset.id as keyof typeof icons];

          const selected =
            selectedBusiness === preset.id;

          return (

            <button
              key={preset.id}
              onClick={() => onSelectBusiness(preset)}
              className={`
                w-full
                rounded-xl
                border
                p-4
                text-left
                transition-all

                ${
                  selected
                    ? "border-[#8A5A14] bg-[#FFF7ED] shadow"
                    : "border-[#E8E4DE] hover:border-[#C17F24]"
                }
              `}
            >

              <div className="flex items-center gap-4">

                <Icon
                  size={22}
                  className="text-[#8A5A14]"
                />

                <div>

                  <h3 className="font-semibold">
                    {preset.name}
                  </h3>

                  <p className="text-sm text-[#6B6560]">
                    {preset.description}
                  </p>

                </div>

              </div>

            </button>

          );
        })}

      </div>

    </div>
  );
}

export default BusinessSelector;