
# Ultimate Auth0 Authentication Guide with Node.js, Express, and EJS

---

## 1. Overview

- Use **Auth0** for secure user authentication (OAuth, social logins, email/password)
- Backend: **Node.js** + **Express**
- Views: **EJS** templates for rendering pages
- Session management and authentication via **express-openid-connect**

---

## 2. Folder Structure

```
auth0-ejs-tutorial/
│
├── views/
│   ├── index.ejs          # Home page (public)
│   └── profile.ejs        # User profile (protected)
│
├── public/                # Static files (css, js, images)
│
├── .env                   # Environment variables (Auth0 config)
├── app.js                 # Main Express server
├── package.json           # Node dependencies and scripts
└── package-lock.json
```

---

## 3. Setup Auth0 Application

- Go to [Auth0 Dashboard](https://manage.auth0.com)
- Create a **Regular Web Application**
- Set **Allowed Callback URLs**: `http://localhost:3000/callback`
- Set **Allowed Logout URLs**: `http://localhost:3000`
- Copy these from your app:
  - **Client ID**
  - **Client Secret**
  - **Domain** (e.g. `dev-xxxxxx.us.auth0.com`)

---

## 4. Environment Variables (.env)

Create `.env` file in your project root:

```env
PORT=3000
CLIENT_ID=your-client-id-from-auth0
CLIENT_SECRET=your-client-secret-from-auth0
ISSUER_BASE_URL=https://your-domain.auth0.com
SECRET=your-random-long-secret-for-sessions
```

- `CLIENT_ID`, `CLIENT_SECRET`, `ISSUER_BASE_URL` — from Auth0 app.
- `SECRET` — a long random string to sign session cookies.
- `PORT` — server port (3000 is common).

---

## 5. Install Dependencies

```bash
npm install express ejs dotenv express-openid-connect
```

For development with auto-restart:

```bash
npm install --save-dev nodemon
```

Add in `package.json`:

```json
"scripts": {
  "dev": "nodemon app.js"
}
```

---

## 6. Create Express App (app.js)

```js
require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: `http://localhost:${process.env.PORT}`,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
};

app.use(auth(config));

app.get('/', (req, res) => {
  res.render('index', {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

app.get('/profile', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('profile', { user: req.oidc.user });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
```

---

## 7. Create Views (EJS Templates)

### `views/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Home</title>
</head>
<body>
  <h1>Welcome to Auth0 + Express App</h1>

  <% if (isAuthenticated) { %>
    <p>Hello, <%= user.name %>!</p>
    <a href="/profile">Profile</a> |
    <a href="/logout">Logout</a>
  <% } else { %>
    <a href="/login">Login</a>
  <% } %>
</body>
</html>
```

---

### `views/profile.ejs`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Profile</title>
</head>
<body>
  <h1>Your Profile</h1>
  <p>Name: <%= user.name %></p>
  <p>Email: <%= user.email %></p>

  <a href="/">Home</a> |
  <a href="/logout">Logout</a>
</body>
</html>
```

---

## 8. Run Your App

- Start dev server:

```bash
npm run dev
```

- Or directly:

```bash
node app.js
```

- Open browser to `http://localhost:3000`

---

## 9. What Happens?

- `/` is public; shows login or user info if authenticated.
- `/profile` requires login; redirects to `/` if not logged in.
- `/login` and `/logout` routes are handled automatically by `express-openid-connect`.
- User info is accessible as `req.oidc.user`.

---

## 10. Managing Users

- Users live in **Auth0 Dashboard** under **User Management**.
- You do not store users locally; Auth0 handles that securely.
- You can view, edit, delete users in Auth0 UI.
- Your app receives user info in session after login.

---

## Extra Tips

- Always keep `.env` secret — don’t commit it to public repos.
- Use a strong random string for `SECRET` (can generate via online tools or Node.js).
- For production, set `baseURL` and callback URLs to your real domain.
- Customize scopes in `authorizationParams` as needed.
- Explore Auth0 dashboard for social logins, MFA, and rules.

---

That's it!  
Now you have a complete, working Auth0 login system in Express with EJS.
