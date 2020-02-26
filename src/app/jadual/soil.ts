export interface Soil {
    id: number;
    code: string;
    description: string;
    symbol: string;
    category: string;
}

export interface SoilRestResult {
    count: number;
    results: Soil[];
}