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
    process.exit(1); // Beendet den Prozess mit einem Fehlercode
  }
  console.log('Erfolgreich mit der Datenbank verbunden.');
});

// ENV Datei vorhanden?
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    console.error('Fehler: .env Datei nicht gefunden oder unvollständig.');
    console.error('Bitte stellen Sie sicher, dass die Datei vorhanden ist und die Umgebungsvariablen korrekt gesetzt sind.');
    process.exit(1); // Beendet den Prozess mit einem Fehlercode
}

// EJS als Template-Engine setzen
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    db.query('SELECT * FROM person', (err, rows, fields) => {
        if (rows.length === 0) {
            return res.status(404).render('pages/error', { title: 'Keine Daten gefunden' });
        }
        db.query('SELECT Beruf_ID id, Beruf_Name name FROM beruf', (err, berufe) => {
            if (err) {
                return res.status(500).send('Interner Serverfehler');
            }
            res.render('pages/index', {
                title: 'SQL Example',
                header: fields,
                content: rows,
                berufe,
            })
        })
      })
})

app.get('/personDetails/:vorname/:nachname', (req, res) => {
    const vorname = req.params.vorname;
    const nachname = req.params.nachname;
    // SQL-Abfrage, um die Details der Person abzurufen
    db.query('SELECT p.Person_ID, p.Person_Vorname, p.Person_Nachname, b.Beruf_Name FROM Person p INNER JOIN Beruf b ON p.Person_Beruf_ID = b.Beruf_ID WHERE Person_Vorname = ? AND Person_Nachname = ?', [vorname, nachname], (err, rows, fields) => {
        if (err) {
            return res.status(500).send('Interner Serverfehler');
        }
        db.query('SELECT Beruf_ID id, Beruf_Name name FROM beruf', (err, berufe) => {
            // Wenn keine Person gefunden wurde, gib eine 404-Fehlerseite zurück
            if (rows.length === 0) {
                return res.status(404).render('pages/error', { title: 'Person nicht gefunden' });
            }
            // Rendern der Seite mit den Details der Person
            res.render('pages/personDetails', {
                title: 'SQL Example',
                header: fields,
                content: rows,
                berufe,
            })
        }
        )
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
    const sqlUpdateText = 'UPDATE person SET Person_Vorname = ?, Person_Nachname = ?, Person_Beruf_ID = ? WHERE Person_ID = ?';
    db.execute(sqlUpdateText, [req.body.Editvorname, req.body.Editnachname, req.body.beruf, req.body.personID], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).send('Person nicht gefunden');
        }else if (result.affectedRows > 1) {
            return res.status(500).send('Mehrere Personen aktualisiert');
        }
        console.log('Person aktualisiert:', result);
        res.redirect('/'); // Nach dem Aktualisieren zurück zur Startseite
    });
}
)

// Route für das DELETE einer Person
app.post('/personDELETE', (req, res) => {
    const sqlDeleteText = 'DELETE FROM person WHERE Person_Vorname = ? AND Person_Nachname = ? AND Person_ID = ?';
    db.execute(sqlDeleteText, [req.body.vorname, req.body.nachname, req.body.personID], (err, result) => {

        if (result.affectedRows === 0) {
            return res.status(404).send('Person nicht gefunden');
        }else if (result.affectedRows > 1) {
            return res.status(500).send('Mehrere Personen gelöscht');
        }

        console.log('Person gelöscht:', result);
        res.redirect('/'); // Nach dem Löschen zurück zur Startseite
    });
}
)

// Route für Searchbar
app.post('/search', (req, res) => {
    const sqlSearchtext = 'SELECT p.Person_Vorname, p.Person_Nachname FROM Person p WHERE p.Person_Vorname LIKE ? OR p.Person_Nachname LIKE ?';

    // Füge % für Teilübereinstimmungen hinzu
    const searchValue = `%${req.body.search}%`;
    db.execute(sqlSearchtext, [searchValue, searchValue], (err, rows) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
            return res.status(500).send('Interner Serverfehler');
        }

        db.execute('SELECT Beruf_ID id, Beruf_Name name FROM beruf', (err, berufe) => {
            // Wenn keine Person gefunden wurde, gib eine 404-Fehlerseite zurück
            if (rows.length === 0) {
                res.render('pages/index', {
                    title: 'SQL Example',
                    header: ['Kein', 'Ergebnis'],
                    content: [{Person_Vorname: 'Keine', Person_Nachname: 'Ergebnisse'}],
                    berufe,
                });
                return;
            }
            // Rendern der Seite mit den Suchergebnissen
            res.render('pages/index', {
                title: 'SQL Example',
                header: ['Vorname', 'Nachname'],
                content: rows,
                berufe,
            });
        });
    }
    );
}
)

// Route für Fehlerbehandlung
app.use((req, res, next) => {
    res.status(404).render('pages/error', { title: 'Seite nicht gefunden' });
});
// Route für Fehlerbehandlung
app.use((err, req, res, next) => {
    res.status(500).render('pages/error', { title: 'Interner Serverfehler' });
});

// Server starten
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});