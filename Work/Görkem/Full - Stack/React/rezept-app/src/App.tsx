import { useState } from 'react';
import type { Recipe } from './types';
import RecipeList from './components/RecipeList';
import './App.css'

const initialRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://cdn.pixabay.com/photo/2015/04/08/13/13/pasta-712664_1280.jpg',
    description: "Ein klassisches italienisches Gericht.",
    ingredients: ['Spaghetti', 'Eier', 'Parmesan', 'Speck', 'Pfeffer'],
    difficulty: 'medium',
  },
  {
    id: 2,
    title: 'Pfannkuchen',
    image: 'https://cdn.pixabay.com/photo/2017/03/13/13/39/pancakes-2139844_1280.jpg',
    description: "Ein einfaches und leckeres Frühstück.",
    ingredients: ['Mehl', 'Eier', 'Milch', 'Zucker', 'Salz'],
    difficulty: 'easy',
  },
  {
    id: 3,
    title: 'Rindersteak',
    image: 'https://cdn.pixabay.com/photo/2020/04/27/05/30/roast-5098185_1280.jpg',
    description: "Ein saftiges Steak, perfekt gegrillt.",
    ingredients: ['Rindersteak', 'Salz', 'Pfeffer', 'Knoblauch', 'Rosmarin'],
    difficulty: 'hard',
  }
];

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [editId, setEditId] = useState<number | null>(null);

  function handleDelete(id: number) {
    setRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
  }

  function handleEdit(id: number, updated: Recipe) {
    setRecipes(recipes =>
      recipes.map(recipe => (recipe.id === id ? updated : recipe))
    );
    setEditId(null);
  }

  return (
    <div>
      <h1>Rezept App</h1>
      <RecipeList
        recipes={recipes}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editId={editId}
        setEditId={setEditId}
      />
    </div>
  );
}

