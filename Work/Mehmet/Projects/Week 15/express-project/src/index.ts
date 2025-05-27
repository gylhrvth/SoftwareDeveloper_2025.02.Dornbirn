import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// EJS als Template Engine konfigurieren
app.set('view engine', 'ejs');
// views-Ordner definieren (standardmäßig 'views' im Projektroot)
app.set('views', path.join(__dirname, '../views'));

// Middleware für JSON-Daten im Body
app.use(express.json());

// Statische Dateien aus public bereitstellen
app.use(express.static(path.join(__dirname, '../public')));

// Interface für City
interface City {
  id: number;
  name: string;
  population: number;
}

// Beispiel-Daten
let cities: City[] = [
  { id: 1, name: 'Berlin', population: 3500000 },
  { id: 2, name: 'München', population: 1500000 }
];

/* =========================
   EJS Routen
=========================*/

// Startseite mit Liste aller Städte
app.get('/', (_req: Request, res: Response) => {
  res.render('index', { cities }); // EJS-Template "index.ejs" mit cities als Daten
});

// Formularseite für neue Stadt
app.get('/add-city', (_req: Request, res: Response) => {
  res.render('add-city');
});

// POST für neues City-Formular (Formularverarbeitung)
app.post('/add-city', (req: Request, res: Response) => {
  const { name, population } = req.body;

  if (!name || !population) {
    // Im echten Projekt lieber Fehlerseite oder Flash-Message anzeigen
    res.status(400).send('Name und Population sind erforderlich.');
    return;
  }

  const newCity: City = {
    id: cities.length ? cities[cities.length - 1].id + 1 : 1,
    name,
    population: Number(population)
  };

  cities.push(newCity);

  // Nach Hinzufügen weiterleiten zur Startseite (Redirect)
  res.redirect('/');
});

/* =========================
   API Routen (wie gehabt)
=========================*/

// GET alle Städte
app.get('/api/city', (_req: Request, res: Response) => {
  res.json(cities);
});

// GET Stadt nach ID
app.get('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const city = cities.find(c => c.id === id);

  if (!city) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  res.json(city);
});

// POST neue Stadt
app.post('/api/city', (req: Request, res: Response) => {
  const { name, population } = req.body;

  if (!name || !population) {
    res.status(400).json({ message: 'Name und Population sind erforderlich.' });
    return;
  }

  const newCity: City = {
    id: cities.length ? cities[cities.length - 1].id + 1 : 1,
    name,
    population
  };

  cities.push(newCity);
  res.status(201).json(newCity);
});

// PUT Stadt ersetzen
app.put('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(c => c.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  const { name, population } = req.body;

  if (!name || !population) {
    res.status(400).json({ message: 'Name und Population sind erforderlich.' });
    return;
  }

  cities[index] = { id, name, population };
  res.json(cities[index]);
});

// PATCH Stadt teilweise aktualisieren
app.patch('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const city = cities.find(c => c.id === id);

  if (!city) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  const { name, population } = req.body;

  if (name !== undefined) city.name = name;
  if (population !== undefined) city.population = population;

  res.json(city);
});

// DELETE Stadt löschen
app.delete('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(c => c.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  cities.splice(index, 1);
  res.status(204).send();
});

/* =========================
   Fehlerseite 404
=========================*/
app.use((_req: Request, res: Response) => {
  res.status(404).render('404');
});

// Server starten
app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});