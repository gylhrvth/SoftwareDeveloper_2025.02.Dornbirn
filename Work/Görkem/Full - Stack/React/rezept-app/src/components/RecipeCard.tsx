import { useState } from 'react';
import type { Recipe } from '../types';

type RecipeCardProps = {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onEdit: (id: number, updated: Recipe) => void;
  isEditing: boolean;
  setEditId: (id: number | null) => void;
};

export default function RecipeCard({ recipe, onDelete, onEdit, isEditing, setEditId }: RecipeCardProps) {
  const { ingredients, ... rest } = recipe;
  const [form, setForm] = useState<Omit<Recipe, "ingredients">>(rest)
  const [ingredientsInput, setIngredientsInput] = useState<string>(ingredients.join(', '));

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === 'ingredients') {
      setIngredientsInput(value)
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onEdit(recipe.id, {
      ...form,
      ingredients: ingredientsInput.split(',').map(i => i.trim()).filter(Boolean),
    });
  }

  if (isEditing) {
    return (
    <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Titel</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} required />

        <label htmlFor="image">Bild-URL</label>
        <input id="image" name="image" value={form.image} onChange={handleChange} required />

        <label htmlFor="description">Beschreibung</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} required />

        <label htmlFor="ingredients">Zutaten (durch Kommas getrennt)</label>
        <input id="ingredients" name="ingredients" value={ingredientsInput} onChange={handleChange} required />

        <label htmlFor="difficulty">Schwierigkeitsgrad</label>
        <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
        </select>

        <div className="button-group">
            <button type="submit">Speichern</button>
            <button type="button" className="cancel" onClick={() => setEditId(null)}>Abbrechen</button>
        </div>
    </form>
    );
}

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p>{recipe.description}</p>
      <h4>Zutaten:</h4>
      <ul>
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      <p className={`difficulty ${recipe.difficulty}`}>
        Schwierigkeitsgrad: {recipe.difficulty}
      </p>
      <button onClick={() => setEditId(recipe.id)}>Bearbeiten</button>
      <button onClick={() => onDelete(recipe.id)}>Löschen</button>
    </div>
  );
}
