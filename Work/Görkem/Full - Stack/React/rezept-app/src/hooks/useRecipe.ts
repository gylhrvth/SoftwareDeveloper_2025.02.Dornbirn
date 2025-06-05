import { useState, useEffect } from 'react';
import type { Recipe } from '../types';

const LOCAL_STORAGE_KEY = "rezepte";

export function useRecipes(initialRecipes: Recipe[]) {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : initialRecipes;
    } catch {
      return initialRecipes;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  return [recipes, setRecipes] as const;
}
