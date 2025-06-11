const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Rezepte abrufen
export async function fetchRecipes() {
  const res = await fetch(`${API_URL}/api/recipes`);
  if (!res.ok) throw new Error('Fehler beim Laden der Rezepte');
  return res.json();
}

// Rezept-Typ definieren
export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  // weitere Felder je nach Bedarf
}

// Rezept anlegen
export async function createRecipe(recipe: Recipe) {
  const res = await fetch(`${API_URL}/api/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error('Fehler beim Anlegen des Rezepts');
  return res.json();
}

// Rezept löschen
export async function deleteRecipe(id: number) {
  const res = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Fehler beim Löschen des Rezepts');
  return res.json();
}