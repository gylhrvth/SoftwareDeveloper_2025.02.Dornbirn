const express = require('express');
const app = express();
require('dotenv').config(); // Lädt Umgebungsvariablen aus .env

// EJS als Template-Engine setzen
app.set('view engine', 'ejs');

// Statische Dateien bereitstellen (z. B. CSS, Bilder)
app.use(express.static('public'));

// Zähler für die Startseite initialisieren
let homePageCounter = 0;

// Route für die Startseite
app.get('/', (req, res) => {
  homePageCounter++; // Zähler nur für die Startseite erhöhen
  res.render('index', { title: 'Startseite', message: 'Willkommen bei EJS!', counter: homePageCounter });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Über uns', description: 'Dies ist eine Beispielseite.' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Seite nicht gefunden' });
  });

// Console Error für Port nicht gefunden
if (!process.env.PORT) {
  console.error('Fehler: DB_PORT ist nicht gesetzt. Bitte überprüfen Sie Ihre .env-Datei.');
  process.exit(1);
}

// Server starten
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});