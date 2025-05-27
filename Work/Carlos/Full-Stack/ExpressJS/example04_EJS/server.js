require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS als Template-Engine konfigurieren
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Middleware für Formulardaten
app.use(express.urlencoded({ extended: true }));

// Navigation als Partial
const navLinks = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Form', url: '/form' }
];

// Middleware: navLinks für alle Templates verfügbar machen
app.use((req, res, next) => {
  res.locals.navLinks = navLinks;
  next();
});

// Startseite
app.get('/', (req, res) => {
  res.render('index');
});

// About-Seite
app.get('/about', (req, res) => {
  res.render('about');
});

// Formular-Seite
/*
app.get('/form', (req, res) => {
  res.render('form', { submitted: false, name: '' });
});*/

// Formular-Verarbeitung
app.post('/form', (req, res) => {
  const { name } = req.body;
  // Nach POST Redirect (PRG-Pattern)
  res.redirect(`/form?submitted=true&name=${encodeURIComponent(name)}`);
});

// Formular-Redirect-Route
app.get('/form', (req, res) => {
  const { submitted, name } = req.query;
  res.render('form', { submitted, name });
});

// 404 Fehlerseite
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});