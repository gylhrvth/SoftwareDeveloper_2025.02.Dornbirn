export type Recipe = {
    id: number;
    title: string;
    image: string;
    description: string;
    ingredients: string[];
    difficulty: 'easy' | 'medium' | 'hard';
};