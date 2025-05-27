require('dotenv').config();
const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Navigation links for all templates
app.use((req, res, next) => {
  res.locals.navLinks = [
    { name: 'Home', url: '/' },
    { name: 'Tasks', url: '/tasks' }
  ];
  next();
});

// Routes
app.use('/', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});