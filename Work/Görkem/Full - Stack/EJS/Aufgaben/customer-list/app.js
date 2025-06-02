require('dotenv').config();

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

const connectDB = require('./server/config/db');


const app = express();
const port = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS & Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Express Session
app.use(session({
  secret: 'dein-geheimes-passwort',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

// express-flash-message mit sessionKeyName
app.use(flash());

// Routes

// Startseite
app.get('/', (req, res) => {
  const locals = {
    title: 'Node.js',
    description: 'Fundiertes User Management System mit Node.js und EJS'
  };
  res.render('index', locals);
});

// About-Seite
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    description: 'Informationen über dieses Projekt'
  });
});

// Customer-Routen
app.use('/customer', require('./server/routes/customer'));

// Error Handling (optional)
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Seite nicht gefunden',
    description: 'Die angeforderte Seite wurde nicht gefunden' 
  });
});

// Server Start
app.listen(port, (err) => {
  if (err) {
    console.error('Server konnte nicht gestartet werden:', err);
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});


