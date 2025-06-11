import db from './db';

// Task interface defines the structure of a task object
export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  user_sub: string; // <-- Add this line
  img_URL?: string | null; // <-- Add this line
  created_at?: Date;
  updated_at?: Date;
}

// =================== READ ===================

// Get all tasks, ordered by creation date (GET)
export const getAll = async (): Promise<Task[]> => {
  const [rows] = await db.query('SELECT * FROM Tasks ORDER BY created_at DESC');
  return rows as Task[];
};

export const getByUserSub = async (user_sub: string): Promise<Task[]> => {
  const [rows] = await db.query('SELECT * FROM Tasks WHERE user_sub = ? ORDER BY created_at DESC', [user_sub]);
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
  const { title, description, status, priority, user_sub, img_URL } = task;
  await db.query(
    'INSERT INTO Tasks (title, description, status, priority, user_sub, img_URL, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
    [title, description, status, priority, user_sub, img_URL]
  );
};

// =================== UPDATE ===================

// Update an existing task by ID (POST/PUT)
export const update = async (id: number, task: Partial<Task>): Promise<void> => {
  const { title, description, status, priority, img_URL } = task;
  await db.query(
    'UPDATE Tasks SET title = ?, description = ?, status = ?, priority = ?, img_URL = ?, updated_at = NOW() WHERE id = ?',
    [title, description, status, priority, img_URL, id]
  );
};


// =================== DELETE ===================

// Remove a task by ID (POST/DELETE)
export const remove = async (id: number): Promise<void> => {
  await db.query('DELETE FROM Tasks WHERE id=?', [id]);
};