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
        SELECT todo_id, todo_title, todo_completed, todo_priority, todo_created, todo_description\
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

app.get('/API/todoapp/stats', (req, res) => {
    const SQL = `
        SELECT
            COUNT(*) AS total,
            SUM(todo_completed = 1) AS completed,
            SUM(todo_completed = 0) AS open
        FROM todos
    `;
    connection.query(SQL, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results[0]);
        }
    });
});

// DELETE: Todos löschen
app.delete('/API/todoapp', (req, res) => {
    console.log('Delete /API/todoapp', req.body);
    const todoId = req.body.todo_id;
    const SQL_DELETE = "DELETE FROM todos WHERE todo_id = ?";
    connection.execute(SQL_DELETE, [todoId], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Todo erfolgreich gelöscht' });
        }
    });
});

// DELETE: Alle erledigten Todos löschen
app.delete('/API/todoapp/completed', (req, res) => {
    const SQL_DELETE_COMPLETED = "DELETE FROM todos WHERE todo_completed = 1";
    connection.execute(SQL_DELETE_COMPLETED, [], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Alle erledigten Todos wurden gelöscht' });
        }
    });
});

// DELETE: Alle Todos löschen
app.delete('/API/todoapp/all', (req, res) => {
    const SQL_DELETE_ALL = "DELETE FROM todos";
    connection.execute(SQL_DELETE_ALL, [], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Alle Todos wurden gelöscht' });
        }
    });
});

// POST: Eine neue Todo hinzufügen
app.post('/API/todoapp', (req, res) => {
    console.log('POST /API/todoapp', req.body);
    const SQL_INSERT = "INSERT INTO todos (todo_title, todo_completed, todo_priority, todo_created, todo_description) VALUES (?, ?, ?, ?, ?)";
    const title = req.body.title;
    const completed = 0;
    const priority = "medium"
    const created = new Date();
    const description = req.body.description && req.body.description.trim() !== "" ? req.body.description : "--";
    connection.execute(SQL_INSERT, [title, completed, priority, created, description], (err, results) => {
        if (err != null) {
            console.error(err)
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Todo erfolgreich hinzugefügt' });
        }
    });
});

// PATCH: Todo erledigt/Unerledigt umschalten
app.patch('/API/todoapp/:id', (req, res) => {
    const todoId = req.params.id;
    const completed = req.body.completed ? 1 : 0;
    const SQL_UPDATE = "UPDATE todos SET todo_completed = ? WHERE todo_id = ?";
    connection.execute(SQL_UPDATE, [completed, todoId], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Todo-Status aktualisiert' });
        }
    });
});

// PATCH: Priorität eines Todos ändern
app.patch('/API/todoapp/:id/priority', (req, res) => {
    const todoId = req.params.id;
    const priority = req.body.priority; // "low", "medium", "high"
    const SQL_UPDATE = "UPDATE todos SET todo_priority = ? WHERE todo_id = ?";
    connection.execute(SQL_UPDATE, [priority, todoId], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Priorität aktualisiert' });
        }
    });
    
});

// PATCH: Edit ändern
app.patch('/API/todoapp/:id/edit', (req, res) => {
    const todoId = req.params.id;
    const { title, description } = req.body;
    const created = new Date();
    const SQL_UPDATE = "UPDATE todos SET todo_title = ?, todo_description = ?, todo_created = ? WHERE todo_id = ?";
    connection.execute(SQL_UPDATE, [title, description, created, todoId], (err, results) => {
        if (err != null) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json({ message: 'Todo aktualisiert' });
        }
    });
});

app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server läuft auf Port ${process.env.HTTP_PORT}`);
});

