import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

interface City {
  id: number;
  name: string;
  population: number;
}

let cities: City[] = [
  { id: 1, name: 'Berlin', population: 3500000 },
  { id: 2, name: 'München', population: 1500000 },
];

// GET all cities
app.get('/api/city', (_req: Request, res: Response) => {
  res.json(cities);
});

// POST new city
app.post('/api/city', (req: Request, res: Response) => {
  const { name, population } = req.body;

  if (!name || !population) {
    res.status(400).json({ message: 'Name and population are required.' });
    return;
  }

  const newCity: City = {
    id: cities.length ? cities[cities.length - 1].id + 1 : 1,
    name: String(name),
    population: Number(population),
  };

  cities.push(newCity);

  res.status(201).json(newCity);
});

// PUT to replace a city
app.put('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'City not found.' });
    return;
  }

  const { name, population } = req.body;

  if (!name || !population) {
    res.status(400).json({ message: 'Name and population are required.' });
    return;
  }

  cities[index] = { id, name, population };
  res.json(cities[index]);
});

// PATCH to update partial city
app.patch('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const city = cities.find(city => city.id === id);

  if (!city) {
    res.status(404).json({ message: 'City not found.' });
    return;
  }

  const { name, population } = req.body;

  if (name !== undefined) city.name = name;
  if (population !== undefined) city.population = population;

  res.json(city);
});

// DELETE a city
app.delete('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'City not found.' });
    return;
  }

  cities.splice(index, 1);
  res.status(204).send();
});

// Handle unknown API endpoints with 404 JSON
app.use('/api/*', (_req, res) => {
  res.status(404).json({ message: 'API endpoint not found.' });
});

// 404 for all other routes (serve 404.html)
app.use((_req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});