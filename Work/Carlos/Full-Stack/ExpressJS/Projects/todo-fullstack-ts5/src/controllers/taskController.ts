import db from '../models/db';
import { Request, Response } from 'express';
import * as Task from '../models/taskModel';
import translations from '../i18n/translations';
import upload from '../middleware/upload';

// Utility function to get language from request query
function getLang(req: Request): 'en' | 'es' | 'hu' {
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';
  return lang as 'en' | 'es' | 'hu';
}

// =================== READ ===================

// READ (GET): List tasks with optional filtering
export const list = async (req: Request, res: Response) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/login');
  }
  const lang = getLang(req);
  const { status, priority, date, all } = req.query;
  let tasks;

// Check if the user is authenticated and has the right to view all tasks
// http://localhost:3003/tasks?all=1 will show all tasks for the user ScraleGi
  if (all && req.oidc.user && req.oidc.user.sub === process.env.ADMIN_SUB) {
    tasks = await Task.getAll();
  } else {
    const userSub = req.oidc.user?.sub;
    tasks = await Task.getByUserSub(userSub);
  }

  // Filtering logic
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
    t: translations[lang as 'en' | 'es' | 'hu'],
    user: req.oidc.user
  });
};

// READ (GET): Show edit page for a specific task
export const showEdit = async (req: Request, res: Response) => {
  const task = await Task.getById(Number(req.params.id));
  if (!task) return res.status(404).render('404');
  res.render('edit', { task });
};

// READ (GET): Show edit form partial for a specific task
export const showEditForm = async (req: Request, res: Response): Promise<void> => {
  const task = await Task.getById(Number(req.params.id));
  if (!task) {
    res.status(404).send('Not found');
    return;
  }
  

  // Get language from query or default to 'en'
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';

  res.render('partials/editForm', {
    task,
    lang,
    t: translations[lang as 'en' | 'es' | 'hu']
  });
};

// READ (GET): Show add form partial
export const showAddForm = (req: Request, res: Response) => {
  let lang = req.query.lang;
  if (Array.isArray(lang)) lang = lang[0];
  if (typeof lang !== 'string' || !['en', 'es', 'hu'].includes(lang)) lang = 'en';

  res.render('partials/addForm', {
    lang,
    t: translations[lang as 'en' | 'es' | 'hu']
  });
};

// =================== CREATE ===================

// CREATE (POST): Create a new task
export const create = [
  upload.single('image_file'),
  async (req: Request, res: Response) => {
    try {
      const { title, description, status, priority } = req.body;
      const user_sub = req.oidc.user?.sub;
      let img_URL = null;

      if (req.file) {
        img_URL = '/uploads/' + req.file.filename;
      }

      await Task.create({
        title,
        description,
        status,
        priority,
        user_sub,
        img_URL
      });

      res.redirect('/tasks');
    } catch (err) {
      res.status(500).send('Error creating task.');
    }
  }
];


// =================== UPDATE ===================

// UPDATE (POST): Update a specific task
import fs from 'fs';
import path from 'path';

export const update = [
  upload.single('image_file'),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { title, description, status, priority } = req.body;
      const existingTask = await Task.getById(id);

      let img_URL = existingTask?.img_URL || null;

      // If "Clear Image" is checked, remove the image
      if (req.body.remove_image && existingTask?.img_URL) {
        img_URL = null;
        // Optionally delete the file from disk
        const filePath = path.join(__dirname, '../../public', existingTask.img_URL);
        fs.unlink(filePath, err => { /* ignore errors */ });
      } else if (req.file) {
        img_URL = '/uploads/' + req.file.filename;
      }

      await Task.update(id, {
        title,
        description,
        status,
        priority,
        img_URL
      });

      res.redirect('/tasks');
    } catch (err) {
      res.status(500).send('Error updating task.');
    }
  }
];

// UPDATE (POST): Toggle the status of a specific task
export const toggleStatus = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const task = await Task.getById(id);
  if (!task) {
    res.status(404).json({ success: false, message: 'Task not found' });
    return;
  }
  await Task.update(id, { ...task, status });

  // Get the language from the request query or default to 'en'
  const lang = getLang(req);
  const statusKey = status.toLowerCase() as 'pending' | 'completed';
  const translatedStatus = translations[lang][statusKey] || status;

  res.json({ success: true, translatedStatus });
};

// =================== DELETE ===================

// DELETE (POST): Remove a specific task
export const remove = async (req: Request, res: Response) => {
  try {
    await Task.remove(Number(req.params.id));
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Error deleting task.');
  }
};
