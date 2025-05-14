const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const result = require('dotenv').config();
if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=goerkem\n\
SQL_PASSWORD=Turkey57xx57\n\
SQL_DATABASE=todoapp\n\
HTTP_PORT');
    process.exit(1);
}

const connection = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,  // Datenbank ist jetzt "todoApp"
});

const app = express();

app.use(express.static('public'));  // Middleware to serve static files
app.use(express.json());  // Middleware to parse JSON data

// Wenn jemand die Startseite aufruft ("/"), dann wird die HTML-Datei gesendet
app.get('/', (req, res) => {
    res.sendFile('todoApp.html', { root: path.join(__dirname, 'public') })
})

// GET: Alle Todos abrufen
app.get('/API/todoapp', (req, res) => {
    console.log('/API/todoapp', req.body);
    const SQL_QUERY = " \
        SELECT todo_id, todo_title, todo_completed, todo_priority, todo_created \
        FROM todos \
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

// DELETE: Todos löschen
app.delete('/API/todoapp', (req, res) => {
    console.log('Delete /API/todoapp', req.body);
    const SQL_DELETE = "DELETE FROM todos WHERE todo_id = ?";
     connection.execute(SQL_DELETE, [req.body.todo_id], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Todo erfolgreich gelöscht' });
        }
    });
});

// POST: Eine neue Todo hinzufügen
app.post('/API/todoapp', (req, res) => {
    console.log('POST /API/todoapp', req.body);
    const SQL_INSERT = "INSERT INTO todos (todo_title, todo_completed, todo_priority, todo_created) VALUES (?, ?, ?, ?)";
    connection.execute(SQL_INSERT, [req.body.title, req.body.completed, req.body.priority, req.body.created], (err, results) => {
        if (err != null) {
            console.error(err)
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Todo erfolgreich hinzugefügt' });
        }
    });
});

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server läuft auf Port ${process.env.HTTP_PORT}`);
});
