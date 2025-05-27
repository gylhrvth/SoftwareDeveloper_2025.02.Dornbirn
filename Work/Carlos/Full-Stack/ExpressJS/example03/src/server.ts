import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';

type City = {
    id: number;
    text: string;
};

let cities: City[] = [
    { id: 1, text: 'Sevilla' },
    { id: 2, text: 'Murcia' },
    { id: 3, text: 'Girona' }
];

const app = express();

//
app.use(express.static('public'));

// JSON Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Root Message
app.get('/', (req: Request, res: Response) => {
    res.send('City API is running!');
});

// GET all cities
// Example:
// curl http://localhost:3002/api/city
app.get('/api/city', (req: Request, res: Response) => {
    res.json(cities);
});

// GET a specific city by ID
// Example:
// curl http://localhost:3002/api/city/2
app.get('/api/city/:id', (req: Request, res: Response) => {
    const cityId = parseInt(req.params.id, 10);
    const city = cities.find(c => c.id === cityId);
    if (city) {
        res.json(city);
    } else {
        res.status(404).json({ error: 'City not found' });
    }
});

// CREATE a new city
// Example:
// curl -X POST http://localhost:3002/api/city -H "Content-Type: application/json" -d '{"text":"New City"}'
app.post('/api/city', (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }
    const newCity: City = {
        id: cities.length > 0 ? cities[cities.length - 1].id + 1 : 1,
        text
    };
    cities.push(newCity);
    res.status(201).json(newCity);
});

// UPDATE (replace) a city by ID (PUT)
// Example:
// curl -X PUT http://localhost:3002/api/city/2 -H "Content-Type: application/json" -d '{"text":"Updated City"}'
app.put('/api/city/:id', (req: Request, res: Response) => {
    const cityId = parseInt(req.params.id, 10);
    const { text } = req.body;
    const cityIndex = cities.findIndex(c => c.id === cityId);

    if (cityIndex === -1) {
        res.status(404).json({ error: 'City not found' });
        return;
    }
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }

    cities[cityIndex] = { id: cityId, text };
    res.json({ message: 'City replaced', city: cities[cityIndex] });
});

// UPDATE (partial) a city by ID (PATCH)
// Example:
// curl -X PATCH http://localhost:3002/api/city/2 -H "Content-Type: application/json" -d '{"text":"Partially Updated City"}'
app.patch('/api/city/:id', (req: Request, res: Response) => {
    const cityId = parseInt(req.params.id, 10);
    const { text } = req.body;
    const city = cities.find(c => c.id === cityId);

    if (!city) {
        res.status(404).json({ error: 'City not found' });
        return;
    }
    if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
    }

    city.text = text;
    res.json({ message: 'City updated', city });
});

// DELETE a city by ID
// Example:
// curl -X DELETE http://localhost:3002/api/city/2
app.delete('/api/city/:id', (req: Request, res: Response) => {
    const cityId = parseInt(req.params.id, 10);
    const cityIndex = cities.findIndex(c => c.id === cityId);
    if (cityIndex === -1) {
        res.status(404).json({ error: 'City not found' });
        return;
    }
    const deletedCity = cities[cityIndex];
    cities = cities.filter(c => c.id !== cityId);
    res.json({ message: 'City deleted', city: deletedCity });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});