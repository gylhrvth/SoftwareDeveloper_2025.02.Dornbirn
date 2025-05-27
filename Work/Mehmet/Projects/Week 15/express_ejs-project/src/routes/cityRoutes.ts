import express from 'express';

export interface City {
  id: number;
  name: string;
  population: number;
}

const router = express.Router();

let cities: City[] = [];
let idCounter = 1;

// Show list and form
router.get('/', (_req, res) => {
  res.render('index', { cities });
});

// Add city
router.post('/add', (req, res) => {
  const { name, population } = req.body;
  if (name && population && !isNaN(Number(population))) {
    cities.push({
      id: idCounter++,
      name: name.trim(),
      population: Number(population),
    });
  }
  res.redirect('/');
});

// Delete city
router.post('/delete/:id', (req, res) => {
  const id = Number(req.params.id);
  cities = cities.filter(city => city.id !== id);
  res.redirect('/');
});

export default router;