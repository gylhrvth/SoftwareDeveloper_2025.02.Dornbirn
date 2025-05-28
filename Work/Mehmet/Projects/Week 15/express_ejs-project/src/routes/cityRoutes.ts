import express from 'express';
import { loadCities, saveCities, City } from '../utils/fileUtils';

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const cities = loadCities().filter(city => city.userId === req.session.user!.id);
  res.render('index', { cities });
});

router.post('/add', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const cities = loadCities();
  const { name, population } = req.body;

  const newCity: City = {
    id: Date.now(),
    name,
    population: Number(population),
    userId: req.session.user.id,
  };

  cities.push(newCity);
  saveCities(cities);
  res.redirect('/');
});

router.post('/delete/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  let cities = loadCities();
  cities = cities.filter(c => c.id !== Number(req.params.id) || c.userId !== req.session.user!.id);
  saveCities(cities);
  res.redirect('/');
});

export default router;