import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log requests
// This middleware logs the request method, URL, and IP address
app.use((req, res, next) => {
    console.log('Query:', req.method, req.url, req.ip);
    console.log('Headers:', req.headers['user-agent']);
    if (req.ip !== '::1') {
        res.status(403).send('Access denied');
        return;
    }
    next();
});

// Beispiel für eine Middleware, die statische Dateien bereitstellt
// Diese Middleware dient dazu, statische Dateien aus dem Verzeichnis 'public' bereitzustellen
// Statische Dateien werden in der Regel für Bilder, CSS, JavaScript usw. verwendet
// http://localhost:3000/images/carlos.jpeg
app.use(express.static('public'));

// Beispiel für eine einfache Route:
// http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Beispiel für eine GET-Anfrage:
// http://localhost:3000/carlos
app.get('/carlos', (req, res) => {
    res.send('Hola, Carlos!');
});

// Beispiel für eine REST API: 
// http://localhost:3000/api/example
app.get('/api/example', (req, res) => {
    res.json({ message: 'Dies ist eine REST API Antwort!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on \x1b]8;;http://localhost:${PORT}\x1b\\http://localhost:${PORT}\x1b]8;;\x1b\\`);
});

