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
import translations from '../i18n/translations';

const router = Router();

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
/*
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
*/
export default router;