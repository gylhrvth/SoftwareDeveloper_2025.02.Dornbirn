import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import type { Recipe } from './types';
import HeaderSearchBar from './components/HeaderSearchBar';
import NotificationBanner from './components/NotificationBanner';
import RecipeAdd from './components/RecipeAdd';
import RecipeList from './components/RecipeList';
import { sortRecipes } from './utils/recipeUtils';
import { useRecipes } from './hooks/useRecipe';
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
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'ingredientsCount' | 'rating'>('title');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [recipes, setRecipes] = useRecipes(initialRecipes);
  const [notification, setNotification] = useState<string | null>(null);
  const [ratingFilter] = useState<number | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Filter-Logik
  const filteredRecipes = sortRecipes(
    recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) &&
      (ratingFilter === null || (recipe.rating ?? 0) >= ratingFilter)
    ),
    sortBy
  );

  function handleDelete(id: number) {
    setRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
    setNotification("Rezept wurde gelöscht!");
  }

  function handleEdit(id: number, updated: Recipe) {
    setRecipes(prev => {
      const old = prev.find(r => r.id === id);
      const updatedList = prev.map(r => (r.id === id ? updated : r));
      if (
        old &&
        (
          old.title !== updated.title ||
          old.description !== updated.description ||
          old.difficulty !== updated.difficulty ||
          old.image !== updated.image ||
          JSON.stringify(old.ingredients) !== JSON.stringify(updated.ingredients)
        )
      ) {
        setNotification("Rezept wurde bearbeitet!");
      }
        return updatedList.sort((a, b) => a.title.localeCompare(b.title));
    });
    setEditId(null);
  }

  function handleAdd(recipe: Recipe) {
    setRecipes(prev => {
      const newId = Math.max(0, ...prev.map(r => r.id)) + 1;
      const newRecipes = [...prev, { ...recipe, id: newId }];
      return newRecipes.sort((a, b) => a.title.localeCompare(b.title));
    });
    setNotification("Rezept wurde hinzugefügt!");
  }

  useEffect(() => {
    if (notification === "Rezept wurde hinzugefügt!" && location.pathname === "/add") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, location.pathname, navigate]);

  return (
    <div>
      {location.pathname === "/" && (
        <HeaderSearchBar
          search={search}
          setSearch={setSearch}
          sortMenuOpen={sortMenuOpen}
          setSortMenuOpen={setSortMenuOpen}
          setSortBy={setSortBy}
        />
      )}

      {notification && (
        <NotificationBanner
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <RecipeList
              recipes={filteredRecipes}
              onDelete={handleDelete}
              onEdit={handleEdit}
              editId={editId}
              setEditId={setEditId}
            />
          }
        />
        <Route
          path="/add"
          element={<RecipeAdd onAdd={handleAdd} />}
        />
      </Routes>
    </div>
  );
}

     
