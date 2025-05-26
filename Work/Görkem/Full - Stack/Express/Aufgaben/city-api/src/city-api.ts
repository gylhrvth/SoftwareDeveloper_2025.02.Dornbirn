import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(express.static('public'));

// Beispiel in Memory Daten
let cities = [
    { id: 1, name: 'Wien'},
    { id: 2, name: 'Berlin'}
];
let nextId = 3;

let countries = [
    { id: 1, name: 'Österreich' },
    { id: 2, name: 'Deutschland' }
];
let nextCountryId = 3;

// GET /api/country
app.get('/api/country', (req: Request, res: Response) => {
    res.json(countries);
});

// POST /api/country
app.post('/api/country', (req: Request, res: Response): void => {
    const name = req.body.name?.trim();
    if (!name || !/^[A-Za-zÄÖÜäöüß\s\-]+$/.test(name)) {
        res.status(400).json({ message: 'Ungültiger Name! Nur Buchstaben und Leerzeichen erlaubt.' });
        return;
    }
    const exists = countries.some(country => country.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        res.status(409).json({ message: 'Dieses Land existiert bereits!' });
        return;
    }
    const newCountry = { id: nextCountryId++, name };
    countries.push(newCountry);
    res.status(201).json(newCountry);
});

// GET /api/city
app.get('/api/city', (req: Request, res: Response) => {
    res.json(cities);
});

// POST /api/city
app.post('/api/city', (req: Request, res: Response): void => {
    const name = req.body.name?.trim();
    if (!name || !/^[A-Za-zÄÖÜäöüß\s\-]+$/.test(name)) {
        res.status(400).json({ message: 'Ungültiger Name! Nur Buchstaben und Leerzeichen erlaubt.' });
        return;
    }
    const exists = cities.some(city => city.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        res.status(409).json({ message: 'Diese Stadt existiert bereits!' });
        return;
    }
    const newCity = { id: nextId++, name };
    cities.push(newCity);
    res.status(201).json(newCity);
});

// PUT /api/city/:id
app.put('/api/city/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = cities.findIndex(city => city.id === id);
    if (index !== -1){
        cities[index] = { id, ...req.body };
        res.json(cities[index]);
    } else {
        res.status(404).json({ message: 'City not found'});
    }
});

// PATCH /api/city/:id
app.patch('/api/city/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const city = cities.find(city => city.id === id);
    if (city) {
        Object.assign(city, req.body);
        res.json(city);
    } else {
        res.status(404).json({ message: 'City not found' });
    }
});

// DELETE /api/city/:id
app.delete('/api/city/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = cities.findIndex(city => city.id === id);
    if (index !== -1) {
        const deleted = cities.splice(index, 1)[0];
        res.json(deleted);
    } else {
        res.status(404).json({ message: 'City not found' });
    }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
