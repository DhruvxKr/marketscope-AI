export interface Market {
  city: string;
  state: string;

  latitude: number;
  longitude: number;

  population: number;

  is_state_capital: number;

  cafes: number;
  universities: number;
  malls: number;
  hotels: number;
  airports: number;

  cafe_density: number;
  university_density: number;
  mall_density: number;
  hotel_density: number;

  expansion_score: number;

  population_score: number;
  cafe_density_score: number;
  university_density_score: number;
  mall_density_score: number;
  hotel_density_score: number;

  rank: number;
}