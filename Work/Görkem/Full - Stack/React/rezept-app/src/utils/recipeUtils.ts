import type { Recipe } from '../types';

export function sortRecipes(
  recipes: Recipe[],
  criterion: 'title' | 'difficulty' | 'ingredientsCount' | 'rating'
) {
  const sorted = [...recipes];
  switch (criterion) {
    case 'title':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'difficulty': {
      const order = { easy: 1, medium: 2, hard: 3 };
      sorted.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
      break;
    }
    case 'ingredientsCount':
      sorted.sort((a, b) => a.ingredients.length - b.ingredients.length);
      break;
    case 'rating':
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default:
      break;
  }
  return sorted;
}