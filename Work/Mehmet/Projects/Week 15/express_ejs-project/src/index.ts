import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// City interface & in-memory storage
interface City {
  id: number;
  name: string;
  population: number;
}

let cities: City[] = [];
let idCounter = 1;

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for static files & form parsing
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

// GET homepage — show cities
app.get('/', (_req, res) => {
  res.render('index', { cities });
});

// POST add city
app.post('/add', (req, res) => {
  const { name, population } = req.body;
  if (name && population && !isNaN(Number(population))) {
    cities.push({ id: idCounter++, name: name.trim(), population: Number(population) });
  }
  res.redirect('/');
});

// POST delete city
app.post('/delete/:id', (req, res) => {
  const id = Number(req.params.id);
  cities = cities.filter(city => city.id !== id);
  res.redirect('/');
});

// 404 page
app.use((_req, res) => {
  res.status(404).render('404');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});