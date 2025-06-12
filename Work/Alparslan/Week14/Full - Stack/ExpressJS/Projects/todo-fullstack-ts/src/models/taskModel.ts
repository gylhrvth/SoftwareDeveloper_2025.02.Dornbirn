import db from './db';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
}

export const getAll = async (): Promise<Task[]> => {
  const [rows] = await db.query('SELECT * FROM Tasks ORDER BY created_at DESC');
  return rows as Task[];
};

export const getById = async (id: number): Promise<Task | undefined> => {
  const [rows] = await db.query('SELECT * FROM Tasks WHERE id = ?', [id]);
  return (rows as Task[])[0];
};

export const create = async (task: Task): Promise<void> => {
  const { title, description, priority } = task;
  await db.query(
    'INSERT INTO Tasks (title, description, priority) VALUES (?, ?, ?)',
    [title, description, priority]
  );
};

export const update = async (id: number, task: Task): Promise<void> => {
  const { title, description, status, priority } = task;
  await db.query(
    'UPDATE Tasks SET title=?, description=?, status=?, priority=? WHERE id=?',
    [title, description, status, priority, id]
  );
};

export const remove = async (id: number): Promise<void> => {
  await db.query('DELETE FROM Tasks WHERE id=?', [id]);
};