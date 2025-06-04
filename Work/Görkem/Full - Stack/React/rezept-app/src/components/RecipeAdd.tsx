import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types"; // <-- Pfad ggf. anpassen!

type RecipeAddProps = {
  onAdd: (recipe: Recipe) => void;
};

const RecipeAdd: React.FC<RecipeAddProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      title,
      image,
      description,
      ingredients: ingredients.split(",").map(i => i.trim()).filter(Boolean),
      difficulty,
    });
    navigate("/");
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Titel</label>
      <input id="title" value={title} onChange={e => setTitle(e.target.value)} required />

      <label htmlFor="image">Bild-URL</label>
      <input id="image" value={image} onChange={e => setImage(e.target.value)} required />

      <label htmlFor="description">Beschreibung</label>
      <input id="description" value={description} onChange={e => setDescription(e.target.value)} required />

      <label htmlFor="ingredients">Zutaten (mit Komma trennen)</label>
      <input id="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required />

      <label htmlFor="instructions">Zubereitung</label>
      <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />

      <label htmlFor="difficulty">Schwierigkeitsgrad</label>
      <select id="difficulty" 
        value={difficulty} 
        onChange={e => setDifficulty(e.target.value as "easy" | "medium" | "hard")}>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>

      <div className="button-group">
        <button type="submit">Speichern</button>
        <button type="button" className="cancel" onClick={() => navigate("/")}>Abbrechen</button>
      </div>
    </form>
  );
};

export default RecipeAdd;




