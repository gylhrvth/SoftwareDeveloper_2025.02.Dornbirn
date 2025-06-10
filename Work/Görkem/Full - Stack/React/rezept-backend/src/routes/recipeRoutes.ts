import express from 'express';
import {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/Controllers';

const router = express.Router();


router.get('/', getAllRecipes);
router.post('/', addRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
