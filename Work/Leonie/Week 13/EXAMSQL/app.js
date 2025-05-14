const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config(); // Lädt Umgebungsvariablen aus .env

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Verarbeitet Formulardaten (wie die aus einem <form>).
app.use(express.json()); // Verarbeitet JSON-Daten

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
    db.query('SELECT * FROM ToDo td', (err, rows, fields) => {
        if (err) {
            return res.status(500).send('Interner Serverfehler');
        }
        if (rows.length === 0) {
            return res.status(404).render('pages/error', { title: 'Keine Daten gefunden' });
        }

        // Daten formatieren
        rows.forEach(row => {
            row.ToDo_Frist = new Date(row.ToDo_Frist);
            // Formatieren des Datums in das gewünschte Format
            row.ToDo_Frist = row.ToDo_Frist.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        });
        res.render('pages/index', {
            title: 'SQL Example',
            header: fields,
            content: rows,
        });
    });
});

app.get('/todo/:id', (req, res) => {
    const todoId = req.params.id;

    db.query('SELECT * FROM ToDo WHERE ToDo_ID = ?', [todoId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Interner Serverfehler' });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: 'ToDo nicht gefunden' });
        }

        const task = rows[0];
        res.json({
            id: task.ToDo_ID,
            title: task.ToDo_Titel,
            description: task.ToDo_Beschreibung,
            dueDate: new Date(task.ToDo_Frist).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }),
            created: task.ToDo_Erstellt,
        });
    });
});

// Server starten
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});