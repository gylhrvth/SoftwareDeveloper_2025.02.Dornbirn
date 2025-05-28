// Load environment variables from .env file
import { auth, ConfigParams } from 'express-openid-connect';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const config: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET!,
  baseURL: 'http://localhost:3003',
  clientID: process.env.AUTH0_CLIENT_ID!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  afterCallback: async (
    req: Request,
    res: Response,
    session: any // or use Session if you want to import and use it
  ) => {
    session.returnTo = '/tasks';
    return session;
  },
    routes: {
    login: false
  }
};


// Import required modules
import express from 'express';
import path from 'path';
import taskRoutes from './routes/taskRoutes';


// Create an Express application
const app = express();
// Set the port from environment or default to 3000
const PORT = process.env.PORT || 3000;


// Initialize authentication middleware with Auth0 configuration
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/tasks' });
});

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// Define a simple route to check authentication status
/*app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});*/

// Route for the home page
app.get('/', (req, res) => {
  const t = { user: 'User' }; // Add more keys as needed for other translations
  res.render('index', { 
    user: req.oidc ? req.oidc.user : null,
    isAuthenticated: req.oidc && req.oidc.isAuthenticated ? req.oidc.isAuthenticated() : false,
    t // <-- pass t to the template
  });
});

// Profile route to display user information if authenticated
app.get('/profile', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    const t = { user: 'User' }; // Add more keys as needed for other translations
    res.render('profile', { 
      user: req.oidc.user,
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      t // <-- pass t to the template
    });
  } else {
    res.redirect('/login');
  }
});

// Set EJS as the view engine for rendering templates
app.set('view engine', 'ejs');
// Set the directory for EJS view files
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON request bodies
app.use(express.json());
// Serve static files (CSS, JS, images) from the public directory
app.use(express.static(path.join(__dirname, '../public')));
// Middleware to parse URL-encoded request bodies (from forms)
app.use(express.urlencoded({ extended: true }));

// Register task-related routes (all main app routes)
app.use('/', taskRoutes);

// Handle 404 errors by rendering a custom 404 page
app.use((req, res) => {
  res.status(404).render('404');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});