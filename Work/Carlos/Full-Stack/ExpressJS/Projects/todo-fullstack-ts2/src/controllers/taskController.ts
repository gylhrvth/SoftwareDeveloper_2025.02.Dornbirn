import { Request, Response } from 'express';
import * as Task from '../models/taskModel';
import translations from '../i18n/translations';



function getLang(req: Request): 'en' | 'es' | 'hu' {
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';
  return lang as 'en' | 'es' | 'hu';
}

export const list = async (req: Request, res: Response) => {
  const lang = getLang(req);
  const { status, priority, date } = req.query;

  // Fetch and filter tasks based on query params
  let tasks = await Task.getAll();

  if (status) {
    tasks = tasks.filter(task => task.status === status);
  }
  if (priority) {
    tasks = tasks.filter(task => task.priority === priority);
  }
  if (date) {
    const dateObj = new Date(date as string);
    tasks = tasks.filter(task => {
      const taskDate = new Date(task.created_at || task.updated_at || '');
      return taskDate.toDateString() === dateObj.toDateString();
    });
  }

  res.render('tasks', {
    tasks,
    lang,
    t: translations[lang]
  });
};

export const create = async (req: Request, res: Response) => {
  try {
    await Task.create(req.body);
    const lang = req.query.lang || 'en';
    res.redirect(`/tasks?lang=${lang}`);
  } catch (err) {
    res.status(500).send('Error creating task.');
  }
};

export const showEdit = async (req: Request, res: Response) => {
  const task = await Task.getById(Number(req.params.id));
  if (!task) return res.status(404).render('404');
  res.render('edit', { task });
};

export const showEditForm = async (req: Request, res: Response): Promise<void> => {
  const task = await Task.getById(Number(req.params.id));
  if (!task) {
    res.status(404).send('Not found');
    return;
  }
  // Get lang from query or default to 'en'
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';

  res.render('partials/editForm', {
    task,
    lang,
    t: translations[lang as 'en' | 'es' | 'hu']
  });
};

// Example for add form
export const showAddForm = (req: Request, res: Response) => {
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';

  res.render('partials/addForm', {
    lang,
    t: translations[lang as 'en' | 'es' | 'hu']
  });
};

export const update = async (req: Request, res: Response) => {
  try {
    await Task.update(Number(req.params.id), req.body);
    const lang = req.query.lang || 'en';
    res.redirect(`/tasks?lang=${lang}`);
  } catch (err) {
    res.status(500).send('Error updating task.');
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await Task.remove(Number(req.params.id));
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Error deleting task.');
  }
};

export const toggleStatus = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const task = await Task.getById(id);
  if (!task) {
    res.status(404).json({ success: false, message: 'Task not found' });
    return;
  }
  await Task.update(id, { ...task, status });

  // Get lang from query or default to 'en'
  const lang = getLang(req);
  const statusKey = status.toLowerCase() as 'pending' | 'completed';
  const translatedStatus = translations[lang][statusKey] || status;

  res.json({ success: true, translatedStatus });
};