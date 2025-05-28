import express from 'express';

const router = express.Router();

// Dummy user
const dummyUser = {
  email: 'admin@example.com',
  password: '1234'
};

// Login form
router.get('/login', (_req, res) => {
  res.render('login', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === dummyUser.email && password === dummyUser.password) {
    req.session.user = { email };
    res.redirect('/');
  } else {
    res.render('login', { error: 'Falsche E-Mail oder Passwort' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;