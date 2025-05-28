// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import required modules
import express from 'express';
import path from 'path';
import taskRoutes from './routes/taskRoutes';

// Create an Express application
const app = express();
// Set the port from environment or default to 3000
const PORT = process.env.PORT || 3000;

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