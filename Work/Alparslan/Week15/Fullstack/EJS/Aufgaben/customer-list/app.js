require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const { auth, requiresAuth } = require('express-openid-connect');
const Customer = require('./server/models/Customer');

const app = express();
const port = process.env.PORT || 5000;

// Datenbank verbinden
connectDB();

// Auth0 Konfiguration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Auth0 Middleware aktivieren
app.use(auth(config));

// User für Views bereitstellen
app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Startseite (öffentlich)
app.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.render('index', {
      title: 'Willkommen',
      description: 'Startseite ohne Login',
      customers
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Fehler beim Laden der Kunden');
  }
});

// About
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    description: 'Informationen über dieses Projekt'
  });
});

// Customer Routen schützen
app.use('/customer', requiresAuth(), require('./server/routes/customer'));

// Error
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Seite nicht gefunden',
    description: 'Die angeforderte Seite wurde nicht gefunden' 
  });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
