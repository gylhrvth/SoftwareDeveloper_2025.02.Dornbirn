import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT), 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    
});

import express from 'express';
import { Request, Response } from 'express';


const app = express();

//
app.use(express.static('public'));

// JSON Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Root Message
app.get('/', (req: Request, res: Response) => {
    res.send('Spanish Cities REST API is running!');
});

// GET all cities
// Example:
// curl http://localhost:3002/api/city
app.get('/api/Cities', async (req: Request, res: Response, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Cities');
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

// GET a specific city by ID
// Example:
// curl http://localhost:3002/api/city/2
// GET a specific city by ID
app.get('/api/Cities/:id', async (req: Request, res: Response, next) => {
    try {
        const cityId = parseInt(req.params.id, 10);
        const [rows] = await db.query('SELECT * FROM Cities WHERE cities_id = ?', [cityId]);
        if ((rows as any[]).length === 0) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.json((rows as any[])[0]);
        }
    } catch (err) {
        next(err);
    }
});


/*
CREATE a new city
Example:
curl -X POST http://localhost:3001/api/Cities -H "Content-Type: application/json" -d '{"cities_name":"Segovia"}'
{"cities_id":12,"cities_name":"Segovia"}'  
*/
app.post('/api/Cities', async (req: Request, res: Response, next) => {
    try {
        const { cities_name } = req.body;
        if (!cities_name) {
            res.status(400).json({ error: 'cities_name is required' });
            return;
        }
        const [result] = await db.query('INSERT INTO Cities (cities_name) VALUES (?)', [cities_name]);
        res.status(201).json({ cities_id: (result as any).insertId, cities_name });
    } catch (err) {
        next(err);
    }
});

// UPDATE (replace) a city by ID (PUT)
// Example:
// curl -X PUT http://localhost:3001/api/Cities/2 -H "Content-Type: application/json" -d '{"cities_name":"Updated City"}'
app.put('/api/Cities/:id', async (req: Request, res: Response, next) => {
    try {
        const cityId = parseInt(req.params.id, 10);
        const { cities_name } = req.body;
        if (!cities_name) {
            res.status(400).json({ error: 'cities_name is required' });
            return;
        }
        const [result] = await db.query('UPDATE Cities SET cities_name = ? WHERE cities_id = ?', [cities_name, cityId]);
        if ((result as any).affectedRows === 0) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.json({ message: 'City replaced', cities_id: cityId, cities_name });
        }
    } catch (err) {
        next(err);
    }
});

// UPDATE (partial) a city by ID (PATCH)
// Example:
// curl -X PATCH http://localhost:3001/api/Cities/2 -H "Content-Type: application/json" -d '{"cities_name":"Partially Updated City"}'
app.patch('/api/Cities/:id', async (req: Request, res: Response, next) => {
    try {
        const cityId = parseInt(req.params.id, 10);
        const { cities_name } = req.body;
        if (!cities_name) {
            res.status(400).json({ error: 'cities_name is required' });
            return;
        }
        const [result] = await db.query('UPDATE Cities SET cities_name = ? WHERE cities_id = ?', [cities_name, cityId]);
        if ((result as any).affectedRows === 0) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.json({ message: 'City updated', cities_id: cityId, cities_name });
        }
    } catch (err) {
        next(err);
    }
});

// DELETE a city by ID
// Example:
// curl -X DELETE http://localhost:3001/api/Cities/2
app.delete('/api/Cities/:id', async (req: Request, res: Response, next) => {
    try {
        const cityId = parseInt(req.params.id, 10);
        const [result] = await db.query('DELETE FROM Cities WHERE cities_id = ?', [cityId]);
        if ((result as any).affectedRows === 0) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.json({ message: 'City deleted', cities_id: cityId });
        }
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});