// 📦 Imports
import express from 'express';  
import dotenv from 'dotenv';  //holt .en-Bibliothek
import path from 'path';
import initCityRoutes from './routes/city';  // default import


// 🌱 .env-Datei laden (damit PORT verfügbar ist)
dotenv.config();        //Liest die .env-Datei und füllt process.env

// 🔧 Express-App erstellen
const app = express();
app.use(express.json());    //sorgt dafür, dass JSON-Daten aus req.body korrekt gelesen werden.


// 📍 PORT aus .env lesen oder Standardwert nehmen
const port = process.env.PORT || 3000;    //Greift auf PORT-Variable aus .env zu

// ✅Statische Dateien aus dem "public" Ordner servieren
app.use(express.static(path.join(__dirname, '..', 'public')));    //	Gibt den public/ Ordner im Browser frei (HTML/CSS/JS)
initCityRoutes(app);

// ✅Hello World Route
app.get('/hello', (_req, res) => {
  res.send('Hello World!');
});

// ✅API Route (nur GET)
app.get('/api/data', (_req, res) => {
  res.json({ message: 'Das sind die API Daten' });
});

// ✅ Starte den Server
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
}).on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} ist bereits belegt. Bitte wähle einen anderen Port.`);
  } else {
    console.error('Server konnte nicht gestartet werden:', err);
  }
  process.exit(1);
});
