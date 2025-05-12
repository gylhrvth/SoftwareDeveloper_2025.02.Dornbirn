const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config(); // Lädt Umgebungsvariablen aus .env
const mysql = require('mysql2')

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
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
});

app.get('/', (req, res) => {
    db.query('SELECT * from country', (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'SQL Example',
            header: fields,
            content: rows
        })
      })
})


app.get('/city', (req, res) => {
    let name = "%" + req.query.name + "%"
 
    let sqlQueryText = 'select name, population \
    from city where name like ?'
    db.query(sqlQueryText, [name], (err, rows, fields) => {
        if (err) throw err

        res.render('about', {
            title: 'SQL Example',
            description: 'City',
            header: fields,
            content: rows,
        })
      })
})

app.post('/city', (req, res) => {
  console.log('POST /city: ', req.body)

  const sqlInsertText = 'INSERT INTO city (name, province, country) VALUES (?, ?, ?)'
  db.execute(sqlInsertText, [req.body.cname, req.body.cname, req.body.ccountry], (err, rows, fields) => {
    console.log('SQL Insert: ', err, rows, fields)
    res.redirect('/city/?name=Vie')
  })
})

app.get('/country', (req, res) => {
    let name = "%" + req.query.name + "%"
 
    let sqlQueryText = 'select * \
    from country where name like ?'
    db.query(sqlQueryText, [name], (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'SQL Example',
            header: fields,
            content: rows,
            searchAction: 'country',
            searchField: 'name'
        })
      })
}
)


// Console Error für Port nicht gefunden
if (!process.env.PORT) {
  console.error('Fehler: DB_PORT ist nicht gesetzt. Bitte überprüfen Sie Ihre .env-Datei.');
  process.exit(1);
}

// Server starten
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});