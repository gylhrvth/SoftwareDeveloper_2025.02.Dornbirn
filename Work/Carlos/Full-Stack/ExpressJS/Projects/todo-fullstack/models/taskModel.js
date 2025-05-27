const db = require('./db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM Tasks ORDER BY created_at DESC');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Tasks WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async (task) => {
  const { title, description, priority } = task;
  await db.query(
    'INSERT INTO Tasks (title, description, priority) VALUES (?, ?, ?)',
    [title, description, priority]
  );
};

exports.update = async (id, task) => {
  const { title, description, status, priority } = task;
  await db.query(
    'UPDATE Tasks SET title=?, description=?, status=?, priority=? WHERE id=?',
    [title, description, status, priority, id]
  );
};

exports.delete = async (id) => {
  await db.query('DELETE FROM Tasks WHERE id=?', [id]);
};