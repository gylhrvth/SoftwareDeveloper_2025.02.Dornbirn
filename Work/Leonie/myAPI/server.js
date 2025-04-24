const http = require('http');
const url = require('url');

// Beispiel-Daten
let objects = [
  { id: 1, name: 'Object 1', data: { key: 'value' } },
  { id: 2, name: 'Object 2', data: null }
];

// Server erstellen
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  // CORS-Header hinzufügen
  res.setHeader('Access-Control-Allow-Origin', '*'); // Erlaubt Anfragen von allen Domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Erlaubt diese HTTP-Methoden
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Erlaubt bestimmte Header

  // OPTIONS-Anfragen behandeln (Preflight-Anfragen)
  if (method === 'OPTIONS') {
    res.writeHead(204); // Kein Inhalt
    res.end();
    return;
  }

  // GET / - Basisroute
  if (method === 'GET' && path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the API!');
  }

  // GET /api/objects - Alle Objekte abrufen
  else if (method === 'GET' && path === '/api/objects') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(objects));
  }

  // GET /api/objects/:id - Einzelnes Objekt abrufen
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

  // POST /api/objects - Neues Objekt erstellen
  else if (method === 'POST' && path === '/api/objects') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newObject = JSON.parse(body);
      newObject.id = objects.length + 1;
      objects.push(newObject);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newObject));
    });
  }

  // Route nicht gefunden
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

// Server starten
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server läuft unter http://192.168.0.62:${PORT}`);
});