import express from 'express';
import { loadCities, saveCities, City } from '../utils/fileUtils';

const router = express.Router();

// List cities (only for logged-in user)
router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const cities = loadCities().filter(city => city.userId === req.session.user!.id);
  res.render('index', { cities });
});

// Add new city
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

// Delete a city - only if belongs to user
router.post('/delete/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  let cities = loadCities();
  // Filter out only the city with matching id AND userId (to protect others' data)
  cities = cities.filter(c => !(c.id === Number(req.params.id) && c.userId === req.session.user!.id));
  saveCities(cities);
  res.redirect('/');
});

// Show edit form for city
router.get('/cities/edit/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const cities = loadCities();
  const city = cities.find(c => c.id === Number(req.params.id) && c.userId === req.session.user!.id);
  if (!city) {
    res.status(404).send('City not found');
    return;
  }
  res.render('editCity', { city });
});

// Handle city update form submission
router.post('/cities/edit/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const cities = loadCities();
  const cityIndex = cities.findIndex(c => c.id === Number(req.params.id) && c.userId === req.session.user!.id);
  if (cityIndex === -1) {
    res.status(404).send('City not found');
    return;
  }

  const { name, population } = req.body;
  cities[cityIndex] = {
    ...cities[cityIndex],
    name,
    population: Number(population),
  };
  saveCities(cities);
  res.redirect('/');
});

export default router;