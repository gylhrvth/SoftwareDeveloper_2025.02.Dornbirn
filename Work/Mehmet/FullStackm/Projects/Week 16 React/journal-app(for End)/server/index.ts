import express, { Request, Response } from 'express';
import session from 'express-session';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

// Extend session type to include 'user'
declare module 'express-session' {
  interface SessionData {
    user?: string;
  }
}

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
}));

const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const ENTRIES_FILE = path.join(__dirname, 'data', 'entries.json');

function readJSON(file: string) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeJSON(file: string, data: any) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Auth routes
app.post('/api/register', (req: Request, res: Response) => {
  const users = readJSON(USERS_FILE);
  const { username, password } = req.body;
  if (users.find((u: any) => u.username === username)) {
     res.status(400).json({ error: 'User exists' });
     return;
  }
  users.push({ username, password });
  writeJSON(USERS_FILE, users);
  req.session.user = username;
  res.json({ success: true });
});

app.post('/api/login', (req: Request, res: Response) => {
  const users = readJSON(USERS_FILE);
  const { username, password } = req.body;
  const user = users.find((u: any) => u.username === username && u.password === password);
  if (!user) {
     res.status(401).json({ error: 'Invalid credentials' });
     return ;
  }
  req.session.user = username;
  res.json({ success: true });
});

app.post('/api/logout', (req: Request, res: Response) => {
  req.session.destroy(() => res.json({ success: true }));
});

// Journal entries
app.get('/api/entries', (req: Request, res: Response) => {
  if (!req.session.user) {
     res.status(401).json({ error: 'Not logged in' });
     return;
  }
  const entries = readJSON(ENTRIES_FILE);
  const userEntries = entries.filter((e: any) => e.user === req.session.user);
  res.json(userEntries);
});

app.post('/api/entries', (req: Request, res: Response) => {
  if (!req.session.user) {
     res.status(401).json({ error: 'Not logged in' });
     return;
  }
  const entries = readJSON(ENTRIES_FILE);
  const newEntry = { id: Date.now(), text: req.body.text, user: req.session.user };
  entries.push(newEntry);
  writeJSON(ENTRIES_FILE, entries);
  res.json(newEntry);
});

app.delete('/api/entries/:id', (req: Request, res: Response) => {
  if (!req.session.user) {
     res.status(401).json({ error: 'Not logged in' });
     return;
  }
  let entries = readJSON(ENTRIES_FILE);
  entries = entries.filter((e: any) => !(e.id == req.params.id && e.user === req.session.user));
  writeJSON(ENTRIES_FILE, entries);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
