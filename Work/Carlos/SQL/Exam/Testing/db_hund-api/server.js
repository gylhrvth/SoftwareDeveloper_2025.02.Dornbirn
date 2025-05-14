const express = require('express');
const mysql = require('mysql2');
const result = require('dotenv').config();

if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=********\n\
SQL_PASSWORD=************\n\
SQL_DATABASE=mondial\n\
HTTP_PORT');
    process.exit(1);
}

const connection = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
});

const app = express();

app.use(express.static('public')); // Middleware to serve static files
app.use(express.json()); // Middleware to parse JSON data

// GET: Retrieve all Hund data
app.get('/API/hund', (req, res) => {
    const SQL_QUERY = "SELECT Hund_ID, Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung FROM Hund";
    connection.query(SQL_QUERY, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Hund data', details: err });
        } else {
            res.json(results);
        }
    });
});

// DELETE: Delete a Hund by name
app.delete('/API/hund', (req, res) => {
    console.log('DELETE /API/hund', req.body);
    const SQL_DELETE = "DELETE FROM Hund WHERE Hund_Name = ?";
    connection.execute(SQL_DELETE, [req.body.Hund_Name], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete Hund', details: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Hund not found' });
        } else {
            res.status(200).json({ message: 'Hund successfully deleted' });
        }
    });
});

// POST: Add a new Hund
app.post('/API/hund', (req, res) => {
    console.log('POST /API/hund', req.body);

    // Validate required fields
    const { Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung } = req.body;
    if (!Hund_Name || !Hund_Geschlecht || !Hund_Einlieferung) {
        return res.status(400).json({ error: 'Missing required fields: Hund_Name, Hund_Geschlecht, Hund_Einlieferung' });
    }

    const SQL_INSERT = "INSERT INTO Hund (Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung) VALUES (?, ?, ?, ?)";
    connection.execute(SQL_INSERT, [Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create Hund', details: err });
        } else {
            res.status(201).json({ message: 'Hund successfully created' });
        }
    });
});

// PUT: Update an existing Hund
app.put('/API/hund', (req, res) => {
    console.log('PUT /API/hund', req.body);

    // Validate required fields
    const { Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung, Hund_ID } = req.body;
    if (!Hund_ID) {
        return res.status(400).json({ error: 'Missing required field: Hund_ID' });
    }

    const SQL_UPDATE = `
        UPDATE Hund
        SET Hund_Rasse = ?, Hund_Geschlecht = ?, Hund_Einlieferung = ?, Hund_Name = ?
        WHERE Hund_ID = ?
    `;
    connection.execute(SQL_UPDATE, [Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung, Hund_Name, Hund_ID], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update Hund', details: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Hund not found' });
        } else {
            res.status(200).json({ message: 'Hund successfully updated' });
        }
    });
});

// Start the server
app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.HTTP_PORT}`);
});