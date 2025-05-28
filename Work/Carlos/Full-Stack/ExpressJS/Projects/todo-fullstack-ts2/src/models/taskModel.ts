import db from './db';

// Task interface defines the structure of a task object
export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  created_at?: Date;
  updated_at?: Date;
  photo?: string;
}

// =================== READ ===================

// Get all tasks, ordered by creation date (GET)
export const getAll = async (): Promise<Task[]> => {
  const [rows] = await db.query('SELECT * FROM Tasks ORDER BY created_at DESC');
  return rows as Task[];
};

// Get a single task by ID (GET)
export const getById = async (id: number): Promise<Task | undefined> => {
  const [rows] = await db.query('SELECT * FROM Tasks WHERE id = ?', [id]);
  return (rows as Task[])[0];
};

// =================== CREATE ===================

// Create a new task (POST)
export const create = async (task: Task): Promise<void> => {
  const { title, description, status, priority } = task;
  await db.query(
    'INSERT INTO Tasks (title, description, status, priority) VALUES (?, ?, ?, ?)',
    [title, description, status, priority]
  );
};

// =================== UPDATE ===================

// Update an existing task by ID (POST/PUT)
export const update = async (id: number, task: Task): Promise<void> => {
  const { title, description, status, priority } = task;
  await db.query(
    'UPDATE Tasks SET title=?, description=?, status=?, priority=?, updated_at=NOW() WHERE id=?',
    [title, description, status, priority, id]
  );
};

// =================== DELETE ===================

// Remove a task by ID (POST/DELETE)
export const remove = async (id: number): Promise<void> => {
  await db.query('DELETE FROM Tasks WHERE id=?', [id]);
};