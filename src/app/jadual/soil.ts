export interface Soil {
    id: number;
    description: string;
    symbol: string;
    category: string;
}

export interface SoilRestResult {
    count: number;
    results: Soil[];
}