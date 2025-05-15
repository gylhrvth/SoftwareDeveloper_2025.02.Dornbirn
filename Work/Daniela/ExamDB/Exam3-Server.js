// 1. Packet laden
const express = require('express')                  //express: Ein Mini-Webserver in Node.js
const mysql = require('mysql2')                     //mysql2: Damit redest du mit der MySQL-Datenbank

require('dotenv').config()                          //dotenv: Liest .env Datei ein – also deine geheimen Daten wie Benutzername, Passwort etc.
// console.log(process.env)

//-----------------------------------------------------------

// 2. Verbindung zur Datenbank aufbauen 
const connection = mysql.createConnection({         //Du nimmst die Daten aus der .env Datei (process.env.____) und verbindest dich mit der Datenbank.
  host: process.env.SQL_SERVER,
  user: process.env.SQL_USER,                     // !!! MERKREGEL: Niemals Zugangsdaten direkt im Code schreiben – .env nutzen !!!
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB
})
connection.connect()

//-------------------------------------------------------------

// 3. Express-App starten
const app = express()                               //Du erstellst deine Webserver-App und sagst: "Ich höre auf Port 3000."
const port = 3000                                   //Das heißt: Wenn du in den Browser http://localhost:3000 eingibst, landest du bei deiner App

app.use(express.static('public')) // Middleware to serve static files
app.use(express.json()); // Middleware to parse JSON data
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

app.get('/', (req, res) => {
  res.redirect('/Exam2.html')
})

//Daten von TODOS DB
app.get('/api/TODOS', (req, res) => {             //Du holst dir 10 Länder aus der Tabelle country aus deiner Datenbank.
  console.log('GET/api/TODOS')
  connection.query('select* \
from todos ', (err, rows, fields) => { //Datenbank-Abfrage: Hole alle Länder aus der Tabelle country, aber nur die ersten 10.
    if (err) {
      res.status(503).json({ message: err.message })
    } else {
      res.json(rows)                              //Gib das Ergebnis als JSON zurück an den Browser.
    }
  })
})
//---------------------------------------------------------
// Einzelnes ToDo nach ID holen
app.get('/api/todo_ID/:id', (req, res) => {
  console.log(`GET /api/todo_ID/:id`);

  const todoId = req.params.id;

  connection.query('SELECT * FROM todos WHERE todo_ID = ?', [todoId], (err, rows) => {
    if (err) {
      res.status(503).json({ message: err.message });
    } else if (rows.length === 0) {
      res.status(404).json({ message: "ToDo nicht gefunden" });
    } else {
      res.json(rows[0]); // Nur ein einzelnes Objekt zurückgeben
    }
  });
});
//-----------------------------------------------------------------
// Neuen ToDo-Eintrag erstellen
app.post('/api/todo', (req, res) => {
 const {
  todo_titel,
  todo_description,
  todo_dueDate,
  todo_responsible,
  todo_complete,
  todo_createdBy
} = req.body;

const createdAt = new Date();
const query = `INSERT INTO todos 
(todo_titel, todo_description, todo_dueDate, todo_responsible, todo_complete, todo_createdBy, todo_createdAt) 
VALUES (?, ?, ?, ?, ?, ?, ?)`;

const values = [todo_titel, todo_description, todo_dueDate, todo_responsible, todo_complete, todo_createdBy, createdAt];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(503).json({ message: err.message });
    } else {
      res.status(201).json({ message: "ToDo erfolgreich erstellt", id: result.insertId });
    }
  });
});

//---------------------------------------------------------------------------
// PATCH: ToDo aktualisieren
app.patch('/api/todo/:id', (req, res) => {
  const todoId = req.params.id;
  const {
    todo_titel,
    todo_responsible,
    todo_description,
    todo_dueDate,
    todo_createdBy,
    todo_complete
  } = req.body;

  const sql = `
    UPDATE todos
    SET
      todo_titel = ?,
      todo_responsible = ?,
      todo_description = ?,
      todo_dueDate = ?,
      todo_createdBy = ?,
      todo_complete = ?,
      todo_updatedAt = CURRENT_TIMESTAMP
    WHERE todo_ID = ?
  `;

  connection.query(sql, [
    todo_titel,
    todo_responsible,
    todo_description,
    todo_dueDate,
    todo_createdBy,
    todo_complete,
    todoId
  ], (err, result) => {
    if (err) {
      console.error("Update-Fehler:", err);
      res.status(500).json({ message: "Fehler beim Aktualisieren" });
    } else {
      res.status(202).json({ message: "ToDo erfolgreich aktualisiert" });
    }
  });
});
//------------------------------------------------------------------------
// PATCH: Nur den todo_complete Status ändern
app.patch('/api/todo/status/:id', (req, res) => {
  const todoId = req.params.id;
  const { todo_complete } = req.body;

  if (typeof todo_complete !== 'boolean') {
    return res.status(400).json({ message: "todo_complete muss ein Boolean sein" });
  }

  const sql = `
    UPDATE todos
    SET todo_complete = ?, todo_updatedAt = CURRENT_TIMESTAMP
    WHERE todo_ID = ?
  `;

  connection.query(sql, [todo_complete, todoId], (err, result) => {
    if (err) {
      console.error("Fehler beim Status-Update:", err);
      res.status(500).json({ message: "Fehler beim Aktualisieren des Status" });
    } else {
      res.status(200).json({ message: "Status erfolgreich aktualisiert" });
    }
  });
});
//----------------------------------------------------------------------------
//------------------------------------------------------------------------
// ToDo-Eintrag löschen
app.delete('/api/TODOS/:id', (req, res) => {
  const todoId = req.params.id;

  const sql = 'DELETE FROM todos WHERE todo_ID = ?';

  connection.query(sql, [todoId], (err, result) => {
    if (err) {
      console.error("Fehler beim Löschen:", err);
      res.status(500).json({ message: "Fehler beim Löschen" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "ToDo nicht gefunden" });
    } else {
      res.status(200).json({ message: "ToDo erfolgreich gelöscht" });
    }
  });
});

//-------------------------------------------------------------------------
app.listen(port, () => {                 //Starte den Server und höre auf Port 3000.
  console.log(`TODO app listening on port ${port}`)
  console.log(`TODO app listening on \u001b]8;;http://localhost:${port}/Exam2.html\u0007http://localhost:${port}/Exam2.html\u001b]8;;\u0007`);
});