const Task = require('../models/taskModel');

exports.list = async (req, res) => {
  const tasks = await Task.getAll();
  res.render('tasks', { tasks });
};

exports.showCreate = (req, res) => {
  res.render('index');
};

exports.create = async (req, res) => {
  try {
    await Task.create(req.body);
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Fehler beim Erstellen der Aufgabe.');
  }
};

exports.showEdit = async (req, res) => {
  const task = await Task.getById(req.params.id);
  if (!task) return res.status(404).render('404');
  res.render('edit', { task });
};

// controllers/taskController.js
exports.update = async (req, res) => {
  const { title, description, status, priority } = req.body;
  if (!title || !status || !priority) {
    return res.status(400).send('Alle Felder müssen ausgefüllt sein.');
  }
  if (status !== 'Pending' && status !== 'Completed') {
    return res.status(400).send('Status muss Pending oder Completed sein.');
  }
  try {
    await Task.update(req.params.id, { title, description, status, priority });
    res.redirect('/tasks');
  } catch (err) {
  console.error('Update error:', err); // Add this line!
  res.status(500).send('Fehler beim Aktualisieren der Aufgabe.');
}
};

exports.delete = async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Fehler beim Löschen der Aufgabe.');
  }
};