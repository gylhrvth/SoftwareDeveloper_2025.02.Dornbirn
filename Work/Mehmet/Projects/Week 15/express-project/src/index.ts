
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); // .env lesen

const app = express();
const port = process.env.PORT || 3000;

// Public-Files wie index.html/CSS/JS anzeigen
app.use(express.static(path.join(__dirname, '../public')));

// Text-Antwort auf /hello
app.get('/hello', (_req, res) => {
  res.send('Hello Digital Campus!');
});

// JSON-Antwort auf /api/data
app.get('/api/data', (_req, res) => {
  res.json({
    name: "Mehmet",
    beruf: "Entwickler",
    interessen: ["Node.js", "Express", "TypeScript"]
  });
});

// Server starten
app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});