// filepath: /my-api/routes/api.js
const express = require('express');
const router = express.Router();

// Beispiel-Daten
let objects = [
    { id: 1, name: 'Object 1', data: { key: 'value' } },
    { id: 2, name: 'Object 2', data: null }
];

// GET /api/objects - Alle Objekte abrufen
router.get('/objects', (req, res) => {
    res.json(objects);
});

// GET /api/objects/:id - Einzelnes Objekt abrufen
router.get('/objects/:id', (req, res) => {
    const object = objects.find(obj => obj.id === parseInt(req.params.id));
    if (!object) return res.status(404).send('Object not found');
    res.json(object);
});

// POST /api/objects - Neues Objekt erstellen
router.post('/objects', (req, res) => {
    const newObject = {
        id: objects.length + 1,
        name: req.body.name,
        data: req.body.data
    };
    objects.push(newObject);
    res.status(201).json(newObject);
});

// PUT /api/objects/:id - Objekt aktualisieren
router.put('/objects/:id', (req, res) => {
    const object = objects.find(obj => obj.id === parseInt(req.params.id));
    if (!object) return res.status(404).send('Object not found');

    object.name = req.body.name || object.name;
    object.data = req.body.data || object.data;
    res.json(object);
});

// DELETE /api/objects/:id - Objekt löschen
router.delete('/objects/:id', (req, res) => {
    const index = objects.findIndex(obj => obj.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Object not found');

    objects.splice(index, 1);
    res.send(`Object with id ${req.params.id} deleted`);
});

module.exports = router;