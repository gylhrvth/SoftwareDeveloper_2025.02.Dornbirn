require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const config = {
  authRequired: false,          // Users can access pages without login by default
  auth0Logout: true,            // Enables /logout route to clear sessions and logout from Auth0
  secret: process.env.SECRET,   // Your session encryption secret (from .env)
  baseURL: `http://localhost:${process.env.PORT}`, // Your app's URL base
  clientID: process.env.CLIENT_ID,          // Auth0 app Client ID
  clientSecret: process.env.CLIENT_SECRET,  // Auth0 app Client Secret (MUST add this!)
  issuerBaseURL: process.env.ISSUER_BASE_URL, // Auth0 domain URL
  authorizationParams: {
    response_type: 'code',       // OAuth 2.0 Authorization Code flow
    scope: 'openid profile email' // Request OpenID Connect scopes: basic user info & email
  }
};

app.use(auth(config)); // Apply Auth0 auth middleware to Express app

// Home page route
app.get('/', (req, res) => {
  // Render 'index.ejs', passing authentication status and user profile if logged in
  res.render('index', {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
  });
});

// Profile page (protected)
app.get('/profile', (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    // If user is not logged in, redirect to home page
    return res.redirect('/');
  }
  // Render 'profile.ejs' with user info
  res.render('profile', { user: req.oidc.user });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});