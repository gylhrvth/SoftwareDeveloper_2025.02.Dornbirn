const http = require('http');
const url = require('url');
const fs = require('fs');

// Daten laden
let objects = [];
let lastId = 0;

const loadData = () => {
    if (fs.existsSync('data.json')) {
        const data = fs.readFileSync('data.json');
        objects = JSON.parse(data);

        // Setze lastId auf die höchste ID in den geladenen Daten
        if (objects.length > 0) {
            lastId = Math.max(...objects.map(obj => obj.id));
        }
    }
};

// Daten speichern
const saveData = () => {
    fs.writeFileSync('data.json', JSON.stringify(objects, null, 2));
};

loadData();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // CORS-Header hinzufügen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // GET / - Basisroute
    if (method === 'GET' && path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the API!');
    }

    // GET /api/objects
    else if (method === 'GET' && path === '/api/objects') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(objects));
    }

    // GET /api/objects/:id
    else if (method === 'GET' && path.startsWith('/api/objects/')) {
        const id = parseInt(path.split('/')[3]);
        const object = objects.find(obj => obj.id === id);

        if (object) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(object));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Object not found');
        }
    }

    // POST /api/objects
    else if (method === 'POST' && path === '/api/objects') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newObject = JSON.parse(body);
            newObject.id = ++lastId; // Erhöhe lastId und weise sie dem neuen Objekt zu
            objects.push(newObject);
            saveData(); // Daten speichern
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newObject));
        });
    }

    // DELETE /api/objects/:id
    else if (method === 'DELETE' && path.startsWith('/api/objects/')) {
        const id = parseInt(path.split('/')[3]);
        const index = objects.findIndex(obj => obj.id === id);

        if (index === -1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Object not found');
        } else {
            objects.splice(index, 1);
            saveData(); // Daten speichern
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Object with id ${id} deleted`);
        }
    }

    // DELETE /api/objects
    else if (method === 'DELETE' && path === '/api/objects') {
        objects = [];
        lastId = 0;
        saveData(); // Daten speichern
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('All objects deleted');
    }

    // PUT /api/objects/:id
    else if (method === 'PUT' && path.startsWith('/api/objects/')) {
        const id = parseInt(path.split('/')[3]);
        const index = objects.findIndex(obj => obj.id === id);

        if (index === -1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Object not found');
        } else {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const updatedObject = JSON.parse(body);
                objects[index] = { ...objects[index], ...updatedObject };
                saveData(); // Daten speichern
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(objects[index]));
            });
        }
    }

    // Route nicht gefunden
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});