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


// Statische Dateien bereitstellen
app.get('/', (req, res) => {
    db.query('SELECT * FROM ToDo td WHERE td.ToDo_isDeleted = FALSE', (err, rows, fields) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
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
            header: fields,
            content: rows,
        });
    });
});


// Route für die Bearbeitung eines ToDo-Elements
app.get('/todo/:id', (req, res) => {
    const todoId = req.params.id;

    db.query('SELECT * FROM ToDo WHERE ToDo_ID = ?', [todoId], (err, rows) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
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
            created: new Date(task.ToDo_Erstellt).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        });
    });
});

// Route für das Erstellen eines neuen ToDo-Elements
app.post('/createToDo', (req, res) => {
    const { title, description, dueDate } = req.body;

    const currentDate = new Date();
    // Setze die Zeit von currentDate auf 00:00:00
        currentDate.setHours(0, 0, 0, 0);
    // Überprüfen, ob das Fälligkeitsdatum in der Zukunft liegt
    if (new Date(dueDate) <= currentDate) {
        return res.status(400).json({ error: 'Das Fälligkeitsdatum muss in der Zukunft liegen.' });
    }

    const createDate = new Date();
    createDate.setHours(createDate.getHours() + 2); // Zeitzone anpassen
    const formattedCreateDate = createDate.toISOString().slice(0, 19).replace('T', ' '); // Formatieren in 'YYYY-MM-DD HH:MM:SS'
    const formattedDueDate = new Date(dueDate).toISOString().slice(0, 19).replace('T', ' '); // Formatieren in 'YYYY-MM-DD HH:MM:SS'
    // SQL-Abfrage, um das neue ToDo-Element hinzuzufügen
    const sqlInsertText = 'INSERT INTO ToDo (ToDo_Titel, ToDo_Beschreibung, ToDo_Frist, ToDo_Erstellt) VALUES (?, ?, ?, ?)';
    db.execute(sqlInsertText, [title, description, formattedDueDate, formattedCreateDate], (err, result) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
            return res.status(500).json({ error: 'Interner Serverfehler' });
        }
        console.log('Neues ToDo hinzugefügt:', result);
        res.redirect('/'); // Nach dem Einfügen zurück zur Startseite
    });
});

// Route zum Löschen eines ToDo-Elements
app.post('/deleteToDo', (req, res) => {
    const todoId = req.body.deleteToDoId; // ID des ToDo-Elements, das gelöscht werden soll

    // SQL-Abfrage, um das ToDo-Element zu löschen
    const sqlSoftDelete = 'UPDATE ToDo SET ToDo_isDeleted = TRUE WHERE ToDo_ID = ?';
    db.execute(sqlSoftDelete, [todoId], (err, result) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
            return res.status(500).json({ error: 'Interner Serverfehler' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'ToDo nicht gefunden' });
        }
        console.log('ToDo gelöscht:', result);
        res.redirect('/'); // Nach dem Löschen zurück zur Startseite
    });
}
);

// Route für das Aktualisieren eines ToDo-Elements
app.post('/updateToDo', (req, res) => {
    const { updateToDoId, taskTitle, taskDescription, taskDueDate } = req.body;

    const currentDate = new Date();
    // Setze die Zeit von currentDate auf 00:00:00
        currentDate.setHours(0, 0, 0, 0);
    // Überprüfen, ob das Fälligkeitsdatum in der Zukunft liegt
    if (new Date(taskDueDate) <= currentDate) {
        return res.status(400).json({ error: 'Das Fälligkeitsdatum muss in der Zukunft liegen.' });
    }

    const formattedDueDate = new Date(taskDueDate).toISOString().slice(0, 19).replace('T', ' '); // Formatieren in 'YYYY-MM-DD HH:MM:SS'

    // SQL-Abfrage, um das ToDo-Element zu aktualisieren
    const sqlUpdateText = 'UPDATE ToDo SET ToDo_Titel = ?, ToDo_Beschreibung = ?, ToDo_Frist = ? WHERE ToDo_ID = ?';
    db.execute(sqlUpdateText, [taskTitle, taskDescription, formattedDueDate, updateToDoId], (err, result) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
            return res.status(500).json({ error: 'Interner Serverfehler' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'ToDo nicht gefunden' });
        }
        console.log('ToDo aktualisiert:', result);
        res.redirect('/'); // Nach dem Aktualisieren zurück zur Startseite
    });
}
);

// Route für die Suche
app.post('/search', (req, res) => {
    const searchValue = `%${req.body.search}%`;
    const sqlSearchText = 'SELECT * FROM ToDo WHERE ToDo_Titel LIKE ? OR ToDo_Beschreibung LIKE ?';

    db.query(sqlSearchText, [searchValue, searchValue], (err, rows) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
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
            content: rows,
        });
    });
}
);

// Route für Anzeige der gelöschten ToDo-Elemente
app.get('/showDelete', (req, res) => {
    db.query('SELECT * FROM ToDo td WHERE td.ToDo_isDeleted = TRUE', (err, rows, fields) => {
        if (err) {
            console.error('Fehler bei der SQL-Abfrage:', err);
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
            content: rows,
        });
    });
}
);

// Server starten
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});