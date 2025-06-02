import fs from 'fs';
import path from 'path';

const usersPath = path.join(__dirname, '../../data/users.json');
const journalsPath = path.join(__dirname, '../../data/journals.json');

function ensureDataDir() {
  const dataDir = path.dirname(usersPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface JournalEntry {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function loadUsers(): User[] {
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
}

export function saveUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

export function loadJournals(): JournalEntry[] {
  if (!fs.existsSync(journalsPath)) return [];
  return JSON.parse(fs.readFileSync(journalsPath, 'utf-8'));
}

export function saveJournals(journals: JournalEntry[]) {
  ensureDataDir();
  fs.writeFileSync(journalsPath, JSON.stringify(journals, null, 2));
}