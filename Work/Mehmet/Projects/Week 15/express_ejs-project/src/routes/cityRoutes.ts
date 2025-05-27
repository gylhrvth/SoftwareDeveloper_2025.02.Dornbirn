import { Router } from 'express';
import { City } from '../types';

const router = Router();

let cities: City[] = [
  { id: 1, name: 'Berlin', population: 3500000 },
  { id: 2, name: 'Wien', population: 1900000 },
];

// Show all cities
router.get('/', (_req, res) => {
  res.render('index', { cities });
});

// Add a city
router.post('/add', (req, res) => {
  const { name, population } = req.body;
  if (!name || !population) {
    return res.render('index', { cities, error: 'Bitte alle Felder ausfüllen.' });
  }
  const newCity: City = {
    id: cities.length ? cities[cities.length - 1].id + 1 : 1,
    name,
    population: parseInt(population),
  };
  cities.push(newCity);
  res.redirect('/');
});

// Delete a city
router.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cities = cities.filter(city => city.id !== id);
  res.redirect('/');
});

export default router;