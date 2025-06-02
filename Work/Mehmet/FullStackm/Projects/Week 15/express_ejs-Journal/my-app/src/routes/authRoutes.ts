import express from 'express-session';
import bcrypt from 'bcryptjs';
import { loadUsers, saveUsers, User } from '../utils/fileUtils';

const router = express.Router();

router.get('/register', (_req: Request, res) => {
  res.render('register', { error: null });
});

router.post('/register', (req, res) => {
  const users = loadUsers();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('register', { error: 'Username and password are required.' });
  }

  if (users.find(u => u.username === username)) {
    return res.render('register', { error: 'User already exists.' });
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
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);

  if (!username || !password) {
    return res.render('login', { error: 'Username and password are required.' });
  }

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('login', { error: 'Invalid credentials.' });
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