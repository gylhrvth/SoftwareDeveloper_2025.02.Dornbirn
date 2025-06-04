import express from 'express';
import bcrypt from 'bcryptjs';
import { loadUsers, saveUsers, User, loadCities, saveCities, City } from '../utils/fileUtils';

const router = express.Router();

// --- Auth Routes ---

router.get('/register', (_req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const users = loadUsers();
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
     res.send('Benutzer existiert bereits.');
     return
  }
  const newUser: User = {
    id: Date.now(),
    username,
    password: bcrypt.hashSync(password, 10),
  };
  users.push(newUser);
  saveUsers(users);
  req.session.user = { id: newUser.id, username: newUser.username };
  res.redirect('/');
});

router.get('/login', (_req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('login', { error: 'Falsche Login-Daten.' });
  }
  req.session.user = { id: user.id, username: user.username };
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// --- City Routes ---

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
  cities = cities.filter(c => !(c.id === Number(req.params.id) && c.userId === req.session.user!.id));
  saveCities(cities);
  res.redirect('/');
});

router.get('/cities/edit/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const cities = loadCities();
  const city = cities.find(c => c.id === Number(req.params.id) && c.userId === req.session.user!.id);
  if (!city)  res.status(404).send('City not found');
  res.render('editCity', { city });
  return
});

router.post('/cities/edit/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const cities = loadCities();
  const cityIndex = cities.findIndex(c => c.id === Number(req.params.id) && c.userId === req.session.user!.id);
  if (cityIndex === -1) res.status(404).send('City not found');
  const { name, population } = req.body;
  cities[cityIndex] = { ...cities[cityIndex], name, population: Number(population) };
  saveCities(cities);
  res.redirect('/');
  return 
});

export default router;