import express from 'express';
import { City } from '../types/City';

const router = express.Router();

let cities: City[] = [];
let idCounter = 1;

router.get('/', (_req, res) => {
  res.render('index', { cities });
});

router.post('/add', (req, res) => {
  const { name, population } = req.body;
  if (name && population) {
    cities.push({ id: idCounter++, name, population: parseInt(population) });
  }
  res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cities = cities.filter(city => city.id !== id);
  res.redirect('/');
});

export default router;