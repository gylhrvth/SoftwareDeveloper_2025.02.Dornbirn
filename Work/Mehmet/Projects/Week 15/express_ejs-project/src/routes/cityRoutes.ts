import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

export interface City {
  id: number;
  name: string;
  population: number;
}

const dataPath = path.join(__dirname, '..', 'data', 'cities.json');

// Helper: Load cities
function loadCities(): City[] {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

// Helper: Save cities
function saveCities(cities: City[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(cities, null, 2));
}

router.get('/', (_req, res) => {
  const cities = loadCities();
  res.render('index', { cities });
});

router.post('/add', (req, res) => {
  const cities = loadCities();
  const { name, population } = req.body;
  const newCity: City = {
    id: Date.now(), // use timestamp as unique ID
    name,
    population: parseInt(population)
  };
  cities.push(newCity);
  saveCities(cities);
  res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
  const cities = loadCities();
  const id = parseInt(req.params.id);
  const updatedCities = cities.filter(city => city.id !== id);
  saveCities(updatedCities);
  res.redirect('/');
});

export default router;