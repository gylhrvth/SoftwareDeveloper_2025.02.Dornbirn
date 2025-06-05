import { useState, useEffect } from 'react';
import type { Recipe } from '../types';

const LOCAL_STORAGE_KEY = "rezepte";

export function useRecipes(initialRecipes: Recipe[]) {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : initialRecipes;
    } catch (err) {
      console.warn("Fehler beim Parsen von Rezepten aus LocalStorage:", err);
      return initialRecipes;
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    const serialized = JSON.stringify(recipes);
    if (stored !== serialized) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    }
  }, [recipes]);

  return [recipes, setRecipes] as const;
}
