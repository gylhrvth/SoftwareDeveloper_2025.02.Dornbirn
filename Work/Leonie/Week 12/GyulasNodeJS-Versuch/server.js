const express = require('express');
const app = express();
require('dotenv').config(); // Lädt Umgebungsvariablen aus .env
const mysql = require('mysql2')

// Statische Dateien bereitstellen
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Verarbeitet Formulardaten (wie die aus einem <form>).
app.use(express.json()); // Verarbeitet JSON-Daten

// MySQL-Datenbankverbindung
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// Verbindung zur Datenbank herstellen
db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank:', err);
    return;
  }
  console.log('Erfolgreich mit der Datenbank verbunden.');
});

// EJS als Template-Engine setzen
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    db.query('SELECT * FROM person', (err, rows, fields) => {
        if (err) throw err
        res.render('pages/index', {
            title: 'SQL Example',
            header: fields,
            content: rows
        })
      }
    )
}
)

app.get('/personDetails/:vorname/:nachname', (req, res) => {
    const vorname = req.params.vorname;
    const nachname = req.params.nachname;
    // SQL-Abfrage, um die Details der Person abzurufen
    db.query('SELECT p.Person_Vorname, p.Person_Nachname, b.Beruf_Name FROM Person p INNER JOIN Beruf b ON p.Person_Beruf_ID = b.Beruf_ID WHERE Person_Vorname = ? AND Person_Nachname = ?', [vorname, nachname], (err, rows, fields) => {
        if (err) {
            console.error('Fehler bei der Datenbankabfrage:', err);
            return res.status(500).send('Interner Serverfehler');
        }
        res.render('pages/personDetails', {
            title: 'SQL Example',
            header: fields,
            content: rows
        })
      }
    )
}
)

// Route für POST einer Person
app.post('/person', (req, res) => {
    const sqlInsertText = 'INSERT INTO person (Person_Vorname, Person_Nachname, Person_Beruf_ID) VALUES (?, ?, ?)';
    db.execute(sqlInsertText, [req.body.vorname, req.body.nachname, req.body.beruf], (err, result) => {
        if (err) throw err;
        console.log('Neue Person hinzugefügt:', result);
        res.redirect('/'); // Nach dem Einfügen zurück zur Startseite
    });
}
)

// Route für das UPDATE einer Person
app.post('/personUPDATE', (req, res) => {
    console.log('UPDATE', req.body);
    const sqlUpdateText = 'UPDATE person SET Person_Vorname = ?, Person_Nachname = ?, Person_Beruf_ID = ? WHERE Person_Vorname = ? AND Person_Nachname = ?';
    db.execute(sqlUpdateText, [req.body.Editvorname, req.body.Editnachname, req.body.beruf, req.body.vorname, req.body.nachname], (err, result) => {
        if (err) throw err;
        console.log('Person aktualisiert:', result);
        res.redirect('/'); // Nach dem Aktualisieren zurück zur Startseite
    });
}
)

// Route für das DELETE einer Person
app.post('/personDELETE', (req, res) => {
    const sqlDeleteText = 'DELETE FROM person WHERE Person_Vorname = ? AND Person_Nachname = ?';
    db.execute(sqlDeleteText, [req.body.vorname, req.body.nachname], (err, result) => {
        if (err) throw err;
        console.log('Person gelöscht:', result);
        res.redirect('/'); // Nach dem Löschen zurück zur Startseite
    });
}
)

// Server starten
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});