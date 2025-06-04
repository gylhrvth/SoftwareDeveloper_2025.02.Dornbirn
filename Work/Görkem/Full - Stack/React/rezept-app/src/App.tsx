import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import type { Recipe } from './types';
import RecipeList from './components/RecipeList';
import RecipeAdd from './components/RecipeAdd';
import './App.css'

// Schlüssel für localStorage
const LOCAL_STORAGE_KEY = "rezepte";

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
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : initialRecipes;
    } catch {
      return initialRecipes;
    }
  });
  
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'ingredientsCount'>('title');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  // Filter-Logik
  const filteredRecipes = sortRecipes(
    recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    ),
    sortBy
  );

  function handleDelete(id: number) {
    setRecipes(recipes => recipes.filter(recipe => recipe.id !== id));
  }

  function handleEdit(id: number, updated: Recipe) {
    setRecipes(prev => {
      const updatedList = prev.map(r => (r.id === id ? updated : r));
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
  }

  function sortRecipes(recipes: Recipe [], criterion: typeof sortBy) {
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

  return (
    <Router>
      <div>
        <div className="header-search-wrapper">
        <h1>Rezept App</h1>
        <div className="search-add-bar">
          <div className="search-input-wrapper">
            <span className="material-icons search-icon" aria-label="Suche">search</span>
            <input
            type="text"
            placeholder="Rezept suchen..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <button
            type="button"
            className="sort-icon-btn"
            onClick={() => setSortMenuOpen(open => !open)}
            title="Sortieren"
            tabIndex={0}
          >
            <span className="material-icons">menu</span>
          </button>
          {sortMenuOpen && (
            <div className="sort-dropdown sort-dropdown-up">
              <button onClick={() => { setSortBy('title'); setSortMenuOpen(false); }}>
                <span className="material-icons">sort_by_alpha</span> Titel
              </button>
              <button onClick={() => { setSortBy('difficulty'); setSortMenuOpen(false); }}>
                <span className="material-icons">signal_cellular_alt</span> Schwierigkeit
              </button>
              <button onClick={() => { setSortBy('ingredientsCount'); setSortMenuOpen(false); }}>
                <span className="material-icons">format_list_numbered</span> Zutatenanzahl
              </button>
            </div>
          )}
          </div>
          <Link to="/add">
            <button className="add-btn" title="Neues Rezept hinzufügen">
              <span className="material-icons" aria-label="Rezept hinzufügen">restaurant_menu</span>
            </button>
          </Link>
        </div>
      </div>
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
    </Router>
  );
}

