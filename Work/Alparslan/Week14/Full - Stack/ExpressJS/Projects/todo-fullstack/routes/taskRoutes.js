const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Home (create form)
router.get('/', taskController.showCreate);
router.post('/add', taskController.create);

// List all tasks
router.get('/tasks', taskController.list);

// Edit task
router.get('/tasks/edit/:id', taskController.showEdit);
router.post('/tasks/edit/:id', taskController.update);

// Delete task
router.post('/tasks/delete/:id', taskController.delete);

module.exports = router;