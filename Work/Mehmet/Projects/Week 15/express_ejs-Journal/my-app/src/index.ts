import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import session from 'express-session';

const SQLiteStoreFactory = require('connect-sqlite3');

import authRoutes from './routes/authRoutes';
import journalRoutes from './routes/journalRoutes';

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
const port = process.env.PORT || 3002;

const SQLiteStore = SQLiteStoreFactory(session);

app.use(session({
  store: new SQLiteStore({
    dir: './data',
    db: 'sessions.sqlite',
  }),
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  },
  rolling: true,
}));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', authRoutes);
app.use('/', journalRoutes);

app.use((_req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
