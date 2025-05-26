import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// .env-Datei laden
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware zum Parsen von JSON-Bodies
app.use(express.json());

// Statische Dateien aus dem "public"-Ordner bereitstellen (z. B. HTML/CSS/JS)
app.use(express.static(path.join(__dirname, '../public')));

// ======= Beispielrouten =======

// /hello → Textantwort
app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Digital Campus!');
});

// /api/data → JSON-Antwort
app.get('/api/data', (_req: Request, res: Response) => {
  res.json({
    name: "Mehmet",
    beruf: "Entwickler",
    interessen: ["Node.js", "Express", "TypeScript"]
  });
});

// ======= REST-API für Städte =======

interface City {
  id: number;
  name: string;
  population: number;
}

// In-Memory-Datenbank
let cities: City[] = [
  { id: 1, name: 'Berlin', population: 3500000 },
  { id: 2, name: 'München', population: 1500000 }
];

// GET /api/city – alle Städte abrufen
app.get('/api/city', (_req: Request, res: Response) => {
  res.json(cities);
});

// POST /api/city – neue Stadt hinzufügen
app.post('/api/city', (req: Request, res: Response) => {
  const { name, population } = req.body;

  if (!name || !population) {
     res.status(400).json({ message: "Name und Population erforderlich" });
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

// PUT /api/city/:id – ganze Stadt ersetzen
app.put('/api/city/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, population } = req.body;

  const index = cities.findIndex(city => city.id === id);
  if (index === -1)  { 
    
    res.status(404).json({ message: "City not found" });
    return
}
  if (!name || !population) {
     res.status(400).json({ message: "Name und Population erforderlich" });
    return;
    }

  cities[index] = { id, name, population };
  res.json(cities[index]);
});

// PATCH /api/city/:id – Stadt teilweise aktualisieren
app.patch('/api/city/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const city = cities.find(c => c.id === id);

  if (!city){ 
 res.status(404).json({ message: "City not found" });
return
  } 

  if (req.body.name !== undefined) city.name = req.body.name;
  if (req.body.population !== undefined) city.population = req.body.population;

  res.json(city);
});

// DELETE /api/city/:id – Stadt löschen
app.delete('/api/city/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) { 
     res.status(404).json({ message: "City not found" });
  return; }
  cities.splice(index, 1);
  res.status(204).send(); // Kein Inhalt
});

// ======= Server starten =======
app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});