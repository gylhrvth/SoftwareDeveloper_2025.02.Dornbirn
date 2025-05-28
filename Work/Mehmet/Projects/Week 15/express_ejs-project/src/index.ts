import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
import cityRoutes from './routes/cityRoutes';
import authRoutes from './routes/authRoutes'; // 👈

import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      name?: string;
      email?: string;
      // Add more Auth0 fields here (e.g., picture, sub, etc.)
    };
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Session middleware must come before anything that uses it
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

// Middleware to set user from session
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Static files and view engine
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Routes - auth before city
app.use('/', authRoutes); // 👈 Add this first
app.use('/', cityRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`✅ Server: http://localhost:${port}`);
});