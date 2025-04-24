// filepath: /my-api/server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// API-Routen
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});