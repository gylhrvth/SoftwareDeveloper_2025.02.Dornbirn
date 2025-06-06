import express, { Request, Response } from 'express';
import session from 'express-session';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcrypt';

// Extend session type to include 'user'
declare module 'express-session' {
  interface SessionData {
    user?: string;
  }
}

const app = express();
const PORT = 3001;
const SALT_ROUNDS = 10;

// CORS config: origin and credentials required for cookies
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000, // 10 minutes
      httpOnly: true,
      // secure: true, // uncomment in production with HTTPS
    },
    rolling: true,
  })
);

const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const ENTRIES_FILE = path.join(__dirname, 'data', 'entries.json');

// Helper functions for JSON read/write
function readJSON(file: string) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]');
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function writeJSON(file: string, data: any) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Register route
app.post('/api/register', async (req: Request, res: Response) => {
  const users = readJSON(USERS_FILE);
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  if (users.find((u: any) => u.username === username)) {
    res.status(400).json({ error: 'User exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  users.push({ username, password: hashedPassword });
  writeJSON(USERS_FILE, users);

  req.session.user = username;
  res.json({ success: true });
});

// Login route
app.post('/api/login', async (req: Request, res: Response) => {
  const users = readJSON(USERS_FILE);
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  const user = users.find((u: any) => u.username === username);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  req.session.user = username;
  res.json({ success: true });
});

// Logout route
app.post('/api/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.json({ success: true });
    }
  });
});

// Get entries for logged in user
app.get('/api/entries', (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }
  const entries = readJSON(ENTRIES_FILE);
  // Return only the entries belonging to this user
  const userEntries = entries.filter((e: any) => e.user === req.session.user);
  res.json(userEntries);
});

// Add new entry for logged in user
app.post('/api/entries', (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }
  const entries = readJSON(ENTRIES_FILE);
  const { text, date } = req.body;

  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  // If date missing or not a string, default to today’s date (YYYY-MM-DD)
  let entryDate: string;
  if (date && typeof date === 'string' && date.trim() !== '') {
    entryDate = date;
  } else {
    entryDate = new Date().toISOString().split('T')[0];
  }

  const newEntry = { id: Date.now(), text, date: entryDate, user: req.session.user };
  entries.push(newEntry);
  writeJSON(ENTRIES_FILE, entries);
  res.json(newEntry);
});

// Delete entry by id for logged in user
app.delete('/api/entries/:id', (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }
  let entries = readJSON(ENTRIES_FILE);
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid entry ID' });
    return;
  }
  const beforeLength = entries.length;
  entries = entries.filter((e: any) => !(e.id === id && e.user === req.session.user));
  if (entries.length === beforeLength) {
    res.status(404).json({ error: 'Entry not found or not owned by user' });
    return;
  }
  writeJSON(ENTRIES_FILE, entries);
  res.json({ success: true });
});

// Update (edit) entry by id for logged in user
app.put('/api/entries/:id', (req: Request, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ error: 'Not logged in' });
    return;
  }
  const entries = readJSON(ENTRIES_FILE);
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid entry ID' });
    return;
  }

  const entryIndex = entries.findIndex(
    (e: any) => e.id === id && e.user === req.session.user
  );
  if (entryIndex === -1) {
    res.status(404).json({ error: 'Entry not found or not owned by user' });
    return;
  }

  const { text, date } = req.body;
  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  // Update text
  entries[entryIndex].text = text;

  // Update date if provided and valid; otherwise leave as-is
  if (date && typeof date === 'string' && date.trim() !== '') {
    entries[entryIndex].date = date;
  }

  writeJSON(ENTRIES_FILE, entries);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
