import type { Recipe } from '../types';

export function sortRecipes(
  recipes: Recipe[],
  criterion: 'title' | 'difficulty' | 'ingredientsCount'
) {
  const sorted = [...recipes];
  if (criterion === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (criterion === 'difficulty') {
    const order = { easy: 1, medium: 2, hard: 3 };
    sorted.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  } else if (criterion === 'ingredientsCount') {
    sorted.sort((a, b) => a.ingredients.length - b.ingredients.length);
  }
  return sorted;
}