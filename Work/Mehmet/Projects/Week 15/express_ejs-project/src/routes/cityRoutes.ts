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

function loadCities(): City[] {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function saveCities(cities: City[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(cities, null, 2));
}

// Stadtliste anzeigen
router.get('/', (_req, res) => {
  const cities = loadCities();
  res.render('index', { cities });
});

// Stadt hinzufügen
router.post('/add', (req, res) => {
  const cities = loadCities();
  const { name, population } = req.body;
  const newCity: City = {
    id: Date.now(),
    name,
    population: parseInt(population)
  };
  cities.push(newCity);
  saveCities(cities);
  res.redirect('/');
});

// Stadt löschen
router.post('/delete/:id', (req, res) => {
  const cities = loadCities();
  const id = parseInt(req.params.id);
  const updated = cities.filter(city => city.id !== id);
  saveCities(updated);
  res.redirect('/');
});

// Bearbeiten-Seite anzeigen
router.get('/edit/:id', (req, res) => {
  const cities = loadCities();
  const id = parseInt(req.params.id);
  const city = cities.find(c => c.id === id);
  if (!city) {
    return res.status(404).render('404');
  }
  res.render('edit', { city });
});

// Bearbeiten speichern
router.post('/edit/:id', (req, res) => {
  const cities = loadCities();
  const id = parseInt(req.params.id);
  const cityIndex = cities.findIndex(c => c.id === id);
  if (cityIndex === -1) {
    return res.status(404).render('404');
  }
  cities[cityIndex].name = req.body.name;
  cities[cityIndex].population = parseInt(req.body.population);
  saveCities(cities);
  res.redirect('/');
});

export default router;