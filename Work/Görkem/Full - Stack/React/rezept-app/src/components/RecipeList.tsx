import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';

type RecipeListProps = {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updated: Recipe) => void;
  editId: number | null;
  setEditId: (id: number | null) => void;
};

export default function RecipeList({ recipes, onDelete, onEdit, editId, setEditId }: RecipeListProps) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          onEdit={onEdit}
          isEditing={editId === recipe.id}
          setEditId={setEditId}
        />
      ))}
    </div>
  );
}
