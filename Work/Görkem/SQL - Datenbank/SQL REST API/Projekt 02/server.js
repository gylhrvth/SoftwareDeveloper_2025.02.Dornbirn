const express = require('express');
const mysql = require('mysql2');
const result = require('dotenv').config();
if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=goerkem\n\
SQL_PASSWORD=Turkey57xx57\n\
SQL_DATABASE=mitarbeiter\n\
HTTP_PORT');
    process.exit(1);
}

const connection = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,  // Datenbank ist jetzt "mitarbeiter"
});

const app = express();

app.use(express.static('public'));  // Middleware to serve static files
app.use(express.json());  // Middleware to parse JSON data

app.get('/API/mitarbeiter', (req, res) => {
    console.log('/API/mitarbeiter')
    const SQL_QUERY = " \
        SELECT person_vorname, person_nachname, beruf_name, beruf_beschreibung \
        FROM person \
        JOIN beruf ON person_beruf_id = beruf_id \
    ";
    connection.query(SQL_QUERY, (err, results) => {
        if (err != null) {
            console.error(err)
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// DELETE: Einen Mitarbeiter löschen
app.delete('/API/mitarbeiter', (req, res) => {
    console.log('DELETE /API/mitarbeiter', req.body);
    const SQL_DELETE = "DELETE FROM mitarbeiter WHERE person_id = ?";
    connection.execute(SQL_DELETE, [req.body.person_id], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Mitarbeiter erfolgreich gelöscht' });
        }
    });
});

// POST: Einen neuen Mitarbeiter hinzufügen
app.post('/API/mitarbeiter', (req, res) => {
    console.log('POST /API/mitarbeiter', req.body);
    const SQL_INSERT = "INSERT INTO mitarbeiter (vorname, nachname, beruf_id) VALUES (?, ?, ?)";
    connection.execute(SQL_INSERT, [req.body.vorname, req.body.nachname, req.body.beruf_id], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Mitarbeiter erfolgreich hinzugefügt' });
        }
    });
});

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server läuft auf Port ${process.env.HTTP_PORT}`);
});