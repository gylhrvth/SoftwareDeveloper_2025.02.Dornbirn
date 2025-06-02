import fs from 'fs';
import path from 'path';

const usersPath = path.join(__dirname, '../../data/users.json');
const citiesPath = path.join(__dirname, '../../data/cities.json');

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

export interface City {
  id: number;
  name: string;
  population: number;
  userId: number;
}

export function loadUsers(): User[] {
  if (!fs.existsSync(usersPath)) return [];
  return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
}

export function saveUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

export function loadCities(): City[] {
  if (!fs.existsSync(citiesPath)) return [];
  return JSON.parse(fs.readFileSync(citiesPath, 'utf-8'));
}

export function saveCities(cities: City[]) {
  ensureDataDir();
  fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2));
}