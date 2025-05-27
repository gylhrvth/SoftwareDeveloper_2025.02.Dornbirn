require('dotenv').config();
const express = require('express');
const path = require('path'); //Importieren des path-Moduls für Pfadoperationen

const app = express();
const PORT = process.env.PORT || 3000;

// EJS als Template-Engine konfigurieren
app.set('view engine', 'ejs'); // Tells Express to use EJS for rendering views
app.set('views', path.join(__dirname, 'views')); // Sets the folder where EJS templates are stored

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public'))); // Serves files from public/ (like CSS and JS) at the root URL.

// Middleware für Formulardaten
app.use(express.urlencoded({ extended: true })); // Allows Express to parse URL-encoded bodies (like form submissions)

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