import { Request, Response } from 'express';
const Recipe = require('../models/Recipe');

// Alle Rezepte abrufen
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Laden der Rezepte' });
  }
};

// Ein Rezept hinzufügen
export const addRecipe = async (req: Request, res: Response) => {
  console.log("addRecipe", req.body)
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    console.log("addRecipe was successful")
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: 'Fehler beim Hinzufügen des Rezepts' });
  }
};

// Ein Rezept bearbeiten
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Fehler beim Bearbeiten des Rezepts' });
  }
};

// Ein Rezept löschen
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rezept gelöscht' });
  } catch (err) {
    res.status(400).json({ error: 'Fehler beim Löschen des Rezepts' });
  }
};