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

// Move translations object here so it's available to all routes
const translations = {
  en: {
    newTask: 'New Task',
    taskTitle: 'Task Title',
    taskDescription: 'Task Description',
    status: 'Status',
    pending: 'Pending',
    completed: 'Completed',
    priority: 'Priority',
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    addTask: 'Add Task',
    cancel: 'Cancel'
  },
  es: {
    newTask: 'Nueva Tarea',
    taskTitle: 'Título de la Tarea',
    taskDescription: 'Descripción de la Tarea',
    status: 'Estado',
    pending: 'Pendiente',
    completed: 'Completada',
    priority: 'Prioridad',
    low: 'Baja',
    normal: 'Normal',
    high: 'Alta',
    addTask: 'Añadir Tarea',
    cancel: 'Cancelar'
  },
  hu: {
    newTask: 'Új Feladat',
    taskTitle: 'Feladat címe',
    taskDescription: 'Feladat leírása',
    status: 'Állapot',
    pending: 'Függőben',
    completed: 'Elvégezve',
    priority: 'Prioritás',
    low: 'Alacsony',
    normal: 'Normál',
    high: 'Magas',
    addTask: 'Feladat hozzáadása',
    cancel: 'Mégse'
  }
};

router.get('/', list);
router.get('/tasks', list);
router.post('/add', create);
router.get('/tasks/edit/:id', showEdit);
router.post('/tasks/edit/:id', update);
router.post('/tasks/delete/:id', remove);
router.post('/tasks/toggle-status/:id', toggleStatus);

// Serve add form partial
router.get('/add-form', (req, res) => {
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';
  res.render('partials/addForm', {
    lang,
    t: translations[lang as 'en' | 'es' | 'hu']
  });
});

// Serve edit form partial
router.get('/tasks/edit-form/:id', showEditForm);

router.get('/add-form', showAddForm);

// Example for your main page route
router.get(['/', '/tasks'], (req, res) => {
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';
  res.render('index', {
    lang,
    t: translations[lang as 'en' | 'es' | 'hu']
  });
});

export default router;