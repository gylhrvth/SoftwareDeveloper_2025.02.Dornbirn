import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';
const SQLiteStoreFactory = require('connect-sqlite3'); // Add this import

import authRoutes from './routes/authRoutes';
import cityRoutes from './routes/cityRoutes';

dotenv.config();

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

const SQLiteStore = SQLiteStoreFactory(session); // Initialize SQLiteStore

// Session middleware with SQLite store
app.use(session({
  store: new SQLiteStore({
    dir: './data',          // Folder for the SQLite session DB file (make sure this exists)
    db: 'sessions.sqlite',  // Session DB file name
  }),
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutes
    httpOnly: true,
  },
  rolling: true,  // Reset maxAge on every response (keeps session alive on activity)
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

// Use routers
app.use('/', authRoutes);
app.use('/', cityRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});