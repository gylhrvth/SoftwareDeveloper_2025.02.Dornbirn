// 📦 Express und Typen importieren
import express, { Request, Response } from 'express';
import dotenv from 'dotenv'; // Für Umgebungsvariablen (.env Datei)
import path from 'path'; // Für Pfadoperationen, z. B. bei static files

// 🔐 .env-Datei laden (z. B. PORT-Nummer)
dotenv.config();

// 🏗️ Express-App erstellen
const app = express();

// 🌐 PORT von .env oder Standard 3000
const port = process.env.PORT || 3000;

// 🧠 Middleware für JSON-Daten im Body (z. B. POST, PUT, PATCH)
app.use(express.json());

// 🌍 Statische Dateien bereitstellen (z. B. HTML, CSS, JS im public-Ordner)
app.use(express.static(path.join(__dirname, '../public')));

// 🏙️ Datentyp (Interface) für eine Stadt
interface City {
  id: number;
  name: string;
  population: number;
}

// 📋 In-Memory-"Datenbank" mit Beispiel-Städten
let cities: City[] = [
  { id: 1, name: 'Berlin', population: 3500000 },
  { id: 2, name: 'München', population: 1500000 }
];

/* 📘 ROUTES (alle unter /api/city) */

// 🔍 GET /api/city → Liste aller Städte senden
app.get('/api/city', (_req: Request, res: Response) => {
  res.json(cities); // alle Städte im JSON-Format zurückgeben
});

// 🔍 GET /api/city/:id → Eine einzelne Stadt anzeigen
app.get('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id); // ID aus der URL extrahieren
  const city = cities.find(city => city.id === id); // Stadt suchen

  if (!city) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  res.json(city); // gefundene Stadt zurückgeben
});

// ➕ POST /api/city → Neue Stadt hinzufügen
app.post('/api/city', (req: Request, res: Response) => {
  const { name, population } = req.body; // Daten aus dem Body

  // Validation: beides muss vorhanden sein
  if (!name || !population) {
    res.status(400).json({ message: 'Name und Population sind erforderlich.' });
    return;
  }

  const newCity: City = {
    id: cities.length ? cities[cities.length - 1].id + 1 : 1, // neue ID berechnen
    name,
    population
  };

  cities.push(newCity); // zur Datenbank hinzufügen
  res.status(201).json(newCity); // zurücksenden
});

// 🔁 PUT /api/city/:id → Ganze Stadt ersetzen
app.put('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  const { name, population } = req.body;

  if (!name || !population) {
    res.status(400).json({ message: 'Name und Population sind erforderlich.' });
    return;
  }

  // Ganze Stadt ersetzen
  cities[index] = { id, name, population };
  res.json(cities[index]);
});

// 🧩 PATCH /api/city/:id → Stadt teilweise aktualisieren
app.patch('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const city = cities.find(city => city.id === id);

  if (!city) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  const { name, population } = req.body;

  // Nur das aktualisieren, was mitgeschickt wurde
  if (name !== undefined) city.name = name;
  if (population !== undefined) city.population = population;

  res.json(city);
});

// ❌ DELETE /api/city/:id → Stadt löschen
app.delete('/api/city/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = cities.findIndex(city => city.id === id);

  if (index === -1) {
    res.status(404).json({ message: 'Stadt nicht gefunden' });
    return;
  }

  cities.splice(index, 1); // Stadt aus Array entfernen
  res.status(204).send(); // 204 = erfolgreich, aber kein Inhalt
});

// 🚀 Server starten
app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});