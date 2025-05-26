import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Interface für City
interface City {
  id: number;
  name: string;
  population: number;
}

// In-Memory Datenbank
let cities: City[] = [
  { id: 1, name: 'Berlin', population: 3500000 },
  { id: 2, name: 'München', population: 1500000 }
];

// GET /api/city – alle Städte zurückgeben
app.get('/api/city', (_req: Request, res: Response) => {
  res.json(cities);
});

// POST /api/city – neue Stadt hinzufügen
app.post('/api/city', (req: Request, res: Response) => {
  const { name, population } = req.body;

  if (!name || !population) {
     res.status(400).json({ message: 'Name und Population sind erforderlich.' });
     return
  }

  const newCity: City = {
    id: cities.length ? cities[cities.length - 1].id + 1 : 1,
    name,
    population
  };

  cities.push(newCity);
  res.status(201).json(newCity);
});

// PUT /api/city/:id – komplette Stadt ersetzen
app.put('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return
  }

  const { name, population } = req.body;

  if (!name || !population) {
    res.status(400).json({ message: 'Name und Population sind erforderlich.' });
    return
  }

  cities[index] = { id, name, population };
  res.json(cities[index]);
});

// PATCH /api/city/:id – Stadt teilweise aktualisieren
app.patch('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const city = cities.find(city => city.id === id);

  if (!city) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return
  }

  const { name, population } = req.body;

  if (name !== undefined) city.name = name;
  if (population !== undefined) city.population = population;

  res.json(city);
});

// DELETE /api/city/:id – Stadt löschen
app.delete('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return
  }

  cities.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});