require('dotenv').config();

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS & Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Routes
app.get('/', (req, res) => {
  const locals = {
    title: 'Node.js',
    description: 'Fundiertes User Management System mit Node.js und EJS'
  };
  res.render('index', locals);
});

// Error Handling (optional)
app.use((req, res) => {
  res.status(404).render('404', { title: 'Seite nicht gefunden' });
});

// Server Start
app.listen(port, (err) => {
  if (err) {
    console.error('Server konnte nicht gestartet werden:', err);
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});

