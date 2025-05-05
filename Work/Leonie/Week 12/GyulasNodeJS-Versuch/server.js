const express = require('express');
const app = express();
require('dotenv').config(); // Lädt Umgebungsvariablen aus .env

// EJS als Template-Engine setzen
app.set('view engine', 'ejs');

// Statische Dateien bereitstellen (z. B. CSS, Bilder)
app.use(express.static('public'));

// Routen definieren
app.get('/', (req, res) => {
  res.render('index', { title: 'Startseite', message: 'Willkommen bei EJS!' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Über uns', description: 'Dies ist eine Beispielseite.' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Seite nicht gefunden' });
  });

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});