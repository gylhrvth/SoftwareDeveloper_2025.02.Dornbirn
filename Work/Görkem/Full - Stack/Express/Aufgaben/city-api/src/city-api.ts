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

// GET /api/city
app.get('/api/city', (req: Request, res: Response) => {
    res.json(cities);
});

// POST /api/city
app.post('/api/city', (req: Request, res: Response) => {
    const newCity = { id: nextId++, ...req.body };
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

