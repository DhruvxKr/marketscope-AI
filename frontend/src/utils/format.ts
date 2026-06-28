export function formatPopulation(population: number): string {
    return `${(population / 1_000_000).toFixed(2)} M`;
}