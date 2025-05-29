import { Router } from 'express';
import {
  list,
  create,
  showEdit,
  update,
  remove,
  showEditForm,
  showAddForm,
  toggleStatus
} from '../controllers/taskController';


const router = Router();

// =================== READ ROUTES ===================

// List all tasks (GET)
router.get('/', list);
router.get('/tasks', list);

// Show edit page for a specific task (GET)
router.get('/tasks/edit/:id', showEdit);

// Serve edit form partial for a specific task (GET)
router.get('/tasks/edit-form/:id', showEditForm);

// Serve add form partial (GET)
router.get('/add-form', showAddForm);

// =================== CREATE ROUTES ===================

// Create a new task (POST)
router.post('/add', create);

// =================== UPDATE ROUTES ===================

// Update a specific task (POST)
router.post('/tasks/edit/:id', update);

// Toggle the status of a specific task (POST)
router.post('/tasks/toggle-status/:id', toggleStatus);

// =================== DELETE ROUTES ===================

// Remove a specific task (POST)
router.post('/tasks/delete/:id', remove);


export default router;