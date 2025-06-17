

export interface Country {
    Code: string;
    Name: string;
    Capital?: string;
    Province?: string;
    Area?: number;
    Popuation?: number;
}

export interface Language {
    name: string;
    percentage: number;
}

export interface Religion {
    name: string;
    percentage: number;
}