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

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
    httpOnly: true,         // security best practice
    // secure: true,        // uncomment if using HTTPS in production
  },
  rolling: true,            // refresh cookie expiration on each request (keeps user logged in if active)
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
app.post('/api/register', async (req: Request, res: Response) => {
  const users = readJSON(USERS_FILE);
  const { username, password } = req.body;

  if (users.find((u: any) => u.username === username)) {
     res.status(400).json({ error: 'User exists' });
     return;
  }

  // HASH the password before saving: bcrypt
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // salt_round are the number of rounds to hash the password

  users.push({ username, password: hashedPassword }); // save hashed password
  writeJSON(USERS_FILE, users);
  req.session.user = username;
  res.json({ success: true });
});

app.post('/api/login', async (req: Request, res: Response) => {
  const users = readJSON(USERS_FILE);
  const { username, password } = req.body;

  const user = users.find((u: any) => u.username === username);
  if (!user) {
     res.status(401).json({ error: 'Invalid credentials' });
    return;
    }

  // COMPARE input password with hashed password:
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
     res.status(401).json({ error: 'Invalid credentials' });
     return;
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
