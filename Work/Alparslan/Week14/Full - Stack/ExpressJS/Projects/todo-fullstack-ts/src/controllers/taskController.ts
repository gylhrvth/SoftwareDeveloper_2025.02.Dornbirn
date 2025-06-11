import { Request, Response } from 'express';
import * as Task from '../models/taskModel';

export const list = async (req: Request, res: Response) => {
  const tasks = await Task.getAll();
  res.render('tasks', { tasks });
};

export const showCreate = (req: Request, res: Response) => {
  res.render('index');
};

export const create = async (req: Request, res: Response) => {
  try {
    await Task.create(req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Fehler beim Erstellen der Aufgabe.');
  }
};

export const showEdit = async (req: Request, res: Response) => {
  const task = await Task.getById(Number(req.params.id));
  if (!task) return res.status(404).render('404');
  res.render('edit', { task });
};

export const update = async (req: Request, res: Response) => {
  try {
    await Task.update(Number(req.params.id), req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Fehler beim Aktualisieren der Aufgabe.');
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await Task.remove(Number(req.params.id));
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Fehler beim Löschen der Aufgabe.');
  }
};