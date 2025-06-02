import express from 'express';
import bcrypt from 'bcryptjs';
import { loadUsers, saveUsers, User } from '../utils/fileUtils';

const router = express.Router();

router.get('/register', (_req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const users = loadUsers();
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
     res.send('Benutzer existiert bereits.');
      return;
      }

  const newUser: User = {
    id: Date.now(),
    username,
    password: bcrypt.hashSync(password, 10),
  };

  users.push(newUser);
  saveUsers(users);

  req.session.user = { id: newUser.id, username: newUser.username };
  res.redirect('/');
});

router.get('/login', (_req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    // Instead of res.send, render login page with error message
    return res.render('login', { error: 'Falsche Login-Daten.' });
  }

  req.session.user = { id: user.id, username: user.username };
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

export default router;
