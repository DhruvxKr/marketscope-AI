import type { BusinessPreset } from "../types/business";

export const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: "coffee",
    name: "Coffee Chain",
    description: "Focus on cafés and student/professional hubs.",
    weights: {
      population: 0.25,
      cafe_density: 0.35,
      university_density: 0.20,
      mall_density: 0.15,
      hotel_density: 0.05,
    },
  },

  {
    id: "restaurant",
    name: "Restaurant",
    description: "High footfall and retail activity.",
    weights: {
      population: 0.30,
      cafe_density: 0.20,
      university_density: 0.10,
      mall_density: 0.30,
      hotel_density: 0.10,
    },
  },

  {
    id: "retail",
    name: "Retail Store",
    description: "Shopping districts and dense population.",
    weights: {
      population: 0.35,
      cafe_density: 0.10,
      university_density: 0.10,
      mall_density: 0.35,
      hotel_density: 0.10,
    },
  },

  {
    id: "hotel",
    name: "Hotel",
    description: "Tourism and commercial travel.",
    weights: {
      population: 0.20,
      cafe_density: 0.10,
      university_density: 0.10,
      mall_density: 0.20,
      hotel_density: 0.40,
    },
  },

  {
    id: "university",
    name: "University",
    description: "Academic ecosystem.",
    weights: {
      population: 0.20,
      cafe_density: 0.10,
      university_density: 0.50,
      mall_density: 0.10,
      hotel_density: 0.10,
    },
  },

  {
    id: "custom",
    name: "Custom",
    description: "Manually adjust all weights.",
    weights: {
      population: 0.40,
      cafe_density: 0.20,
      university_density: 0.15,
      mall_density: 0.15,
      hotel_density: 0.10,
    },
  },
];