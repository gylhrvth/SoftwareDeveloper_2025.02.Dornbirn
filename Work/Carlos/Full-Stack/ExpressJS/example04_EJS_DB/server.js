require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const path = require('path'); //Importieren des path-Moduls für Pfadoperationen

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

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
  { name: 'Form', url: '/form' },
  { name: 'Registrations', url: '/registrations' }
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
app.get('/form', (req, res) => {
  const { submitted, name } = req.query;
  res.render('form', { submitted, name });
});

// Formular-Redirect-Route (mit DB)

app.post('/form', async (req, res) => {
  const { name, email, message, subscribe } = req.body;
  const newsletter = subscribe === 'yes' ? true : false;

  try {
    await db.query(
      'INSERT INTO Registration (reg_name, reg_email, reg_comment, reg_newsletter) VALUES (?, ?, ?, ?)',
      [name, email, message, newsletter]
    );
    res.redirect(`/form?submitted=true&name=${encodeURIComponent(name)}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Fehler beim Speichern der Daten.');
  }
});

// Show all registrations
app.get('/registrations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Registration');
    res.render('registrations', { registrations: rows });
  } catch (err) {
    res.status(500).send('Fehler beim Laden der Daten.');
  }
});

// 404 Fehlerseite
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});