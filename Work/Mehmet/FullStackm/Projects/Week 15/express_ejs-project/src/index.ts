import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
const SQLiteStoreFactory = require('connect-sqlite3');

import routes from './routes/routes';

dotenv.config();

// Inline City type (optional, if needed elsewhere)
export interface City {
  id: number;
  name: string;
  population: number;
  userId: number;
}

// Inline session user augmentation
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      username: string;
    };
  }
}

const app = express();
const port = process.env.PORT || 3001;

const SQLiteStore = SQLiteStoreFactory(session);

// Session middleware with SQLite store
app.use(session({
  store: new SQLiteStore({
    dir: './data',
    db: 'sessions.sqlite',
  }),
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutes
    httpOnly: true,
  },
  rolling: true,
}));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Static files and view engine
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use merged routes
app.use('/', routes);

// 404 handler
app.use((_req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});