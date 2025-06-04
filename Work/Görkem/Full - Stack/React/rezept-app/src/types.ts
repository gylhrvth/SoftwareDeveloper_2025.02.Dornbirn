export type Recipe = {
    id: number;
    title: string;
    image: string;
    description: string;
    ingredients: string[];
    instructions?: string;
    difficulty: 'easy' | 'medium' | 'hard';
};