
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// GET all todos
app.get('/api/todo', (req, res) => {
    const query = 'SELECT todo_ID, todo_Task, todo_Description, todo_Status, created_at, updated_at FROM todo';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST a new todo
app.post('/api/todo', (req, res) => {
    const { todo_Task, todo_Description, todo_Status } = req.body;
    const query = 'INSERT INTO todo (todo_Task, todo_Description, todo_Status) VALUES (?, ?, ?)';
    db.query(query, [todo_Task, todo_Description, todo_Status || 'Pending'], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId });
    });
});

// PUT (update) a todo
app.put('/api/todo/:id', (req, res) => {
    const { id } = req.params;
    const { todo_Task, todo_Description, todo_Status } = req.body;
    const query = 'UPDATE todo SET todo_Task = ?, todo_Description = ?, todo_Status = ? WHERE todo_ID = ?';
    db.query(query, [todo_Task, todo_Description, todo_Status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo updated successfully' });
    });
});

// DELETE a todo
app.delete('/api/todo/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM todo WHERE todo_ID = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    });
});


// Start Server
app.listen(process.env.HTTP_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.HTTP_PORT}`);
});