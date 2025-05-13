const express = require('express');
const mysql = require('mysql2');
const result = require('dotenv').config();

if (result.error) {
  console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=root\n\
SQL_PASSWORD=root\n\
SQL_DATABASE=mitarbeiter\n\
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

app.use(express.static('public'));       // Serve static files from public/
app.use(express.json());                 // Parse JSON request bodies

// ✅ GET: Personen mit Berufsbezeichnung
app.get('/API/person', (req, res) => {
  const SQL_QUERY = `
    SELECT 
      person.Person_ID, 
      person.Person_Vorname, 
      person.Person_Nachname, 
      beruf.Beruf_Name,
      beruf.Beruf_Beschreibung 
    FROM person
    LEFT JOIN beruf ON person.Person__Beruf_ID = beruf.Beruf_ID
  `;
  connection.query(SQL_QUERY, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// ✅ GET: Alle Berufe
app.get('/API/beruf', (req, res) => {
  const SQL_QUERY = `
    SELECT 
      Beruf_ID, 
      Beruf_Name, 
      Beruf_Beschreibung 
    FROM beruf
  `;
  connection.query(SQL_QUERY, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// ✅ DELETE: Person löschen anhand Person_ID
app.delete('/API/person', (req, res) => {
  console.log('DELETE /API/person', req.body);
  const SQL_DELETE = `DELETE FROM person WHERE Person_ID = ?`;
  connection.execute(SQL_DELETE, [req.body.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: 'Person erfolgreich gelöscht' });
    }
  });
});

// ✅ POST: Neue Person einfügen
app.post('/API/person', (req, res) => {
  console.log('POST /API/person', req.body);
  const { vorname, nachname, beruf_id } = req.body;
  const SQL_INSERT = `
    INSERT INTO person (Person_Vorname, Person_Nachname, Person__Beruf_ID)
    VALUES (?, ?, ?)
  `;
  connection.execute(SQL_INSERT, [vorname, nachname, beruf_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: 'Person erfolgreich hinzugefügt' });
    }
  });
});

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Server läuft auf http://localhost:${process.env.HTTP_PORT}`);
});
