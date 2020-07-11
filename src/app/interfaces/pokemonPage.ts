
export interface pokemonPage {
    count: number;
    next: string;
    previous: boolean;
    results: Array<{
        name:string;
        url: string;
    }>;
}