const path = require('path')
const express = require('express');
const result = require('dotenv').config();
const mysql = require('mysql2/promise');

// Verbindung zur MySQL-Datenbank
const pool = mysql.createPool({
  host: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


if (result.error) {
  console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=*********\n\
SQL_PASSWORD=**********\n\
SQL_DATABASE=abcdefgh\n\
HTTP_PORT=3333');
  process.exit(1);
}


const app = express();

app.use(express.static(path.join(__dirname, '../frontend')));       // Serve static files from public/
app.use(express.json());

// GET /api/todo – Alle Todos abrufen
app.get('/api/todo', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Fehler beim Abrufen der Todos:', err);
    res.status(500).json({ error: 'Serverfehler beim Laden der Todos' });
  }
});


// GET /api/todo/:id – Einzelnes Todo abrufen
app.get('/api/todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo nicht gefunden' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Fehler beim Abrufen des Todos:', err);
    res.status(500).json({ error: 'Serverfehler beim Abrufen des Todos' });
  }
});



// POST /api/todo – Neues Todo speichern
app.post('/api/todo', async (req, res) => {
  const { title, details, due_date, responsible, priority, complete, created_by } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO todos (title, description, due_date, responsible, priority, complete, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, details, due_date, responsible, priority, complete, created_by]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Fehler beim Speichern des Todos:', err);
    res.status(500).json({ error: 'Serverfehler beim Speichern' });
  }
});



// PATCH /api/todo/:id – Todo aktualisieren
app.patch('/api/todo/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // camelCase → snake_case Mapping
  const fieldMap = {
    dueDate: 'due_date',
    createdBy: 'created_by'
  };

  try {
    const fields = Object.keys(updates).map(field => {
      const dbField = fieldMap[field] || field;
      return `${dbField} = ?`;
    }).join(', ');

    const values = Object.values(updates);
    values.push(id);

    await pool.query(`UPDATE todos SET ${fields} WHERE id = ?`, values);
    res.json({ message: 'Todo aktualisiert' });
  } catch (err) {
    console.error('Fehler beim Aktualisieren:', err);
    res.status(500).json({ error: 'Serverfehler beim Aktualisieren' });
  }
});



// DELETE /api/todo/:id – Todo löschen
app.delete('/api/todo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.json({ message: 'Todo gelöscht' });
  } catch (err) {
    console.error('Fehler beim Löschen:', err);
    res.status(500).json({ error: 'Serverfehler beim Löschen' });
  }
});







app.listen(process.env.HTTP_PORT, () => {
  console.log(`Server läuft auf http://localhost:${process.env.HTTP_PORT}`);
});
