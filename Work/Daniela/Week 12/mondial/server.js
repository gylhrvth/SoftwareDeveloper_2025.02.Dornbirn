
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

//-------------------------------------------------------------

/*// 4. Route: /
app.get('/', (req, res) => {                        //Wenn du http://localhost:3000/ aufrufst, bekommst du einfach {"message": "Hello World!"} zurück.
  res.json({ message: 'Hello World!' })
})

//-------------------------------------------------------------

// 5. Rout:/api/country                               Neue Route: /api/country
app.get('/api/country', (req, res) => {             //Du holst dir 10 Länder aus der Tabelle country aus deiner Datenbank.
  console.log('GET /api/country')
  connection.query('SELECT * from country limit 10', (err, rows, fields) => { //Datenbank-Abfrage: Hole alle Länder aus der Tabelle country, aber nur die ersten 10.
    if (err) throw err                          //Wenn ein Fehler passiert (z. B. falsche Tabelle), zeig ihn im Terminal.

    res.json(rows)                              //Gib das Ergebnis als JSON zurück an den Browser.
  })
})

//--------------------------------------------------------------

// 6. Rout:/api/city?name=xyz
app.get('/api/city', (req, res) => {                  //Hier wird eine Suche vorbereitet.
  console.log('GET /api/city ' + req.query.name)
  const queryString = '%' + (req.query.name != undefined ? req.query.name : '') + '%'  //Wenn du z. B. ?name=ber schreibst, wird daraus '%ber%'.         
  console.log(queryString)

  connection.query('SELECT * from city where name like ? limit 10', [queryString], (err, rows, fields) => {  //Suche alle Städte, deren Name den Suchtext enthält (LIKE ist wie eine "enthält"-Suche).
    if (err) throw err
    //Antwort wird wieder als JSON gesendet.
    res.json(rows)
  })
})
//---------------------------------------------------------------
// 7. Route: /api/city/addpopulation?name=xyz                Diese Route erhöht die Einwohnerzahl einer Stadt.    
app.get('/api/city/addpopulation', (req, res) => {
  console.log('GET /api/city/addpopulation ' + req.query.name)
  const queryString = req.query.name != undefined ? req.query.name : ''

  connection.execute('update city set Population = Population + 1 where city.name = ?', [queryString], (err, result, fields) => {     //Das hier macht ein Update: Bevölkerung +1 für die Stadt mit dem angegebenen Namen.
    if (err instanceof Error) {     //Wenn ein Fehler passiert, zeig ihn.
      console.log(err);
      return;
    }

    console.log(result);
    console.log(fields);

    res.json(result)                //Zeig das Ergebnis vom Update im Browser.
  });
})


app.listen(port, () => {                 //Starte den Server und höre auf Port 3000.
  console.log(`Example app listening on port ${port}`)
})*/

app.get('/api/country', (req, res) => {
  console.log('GET/api/country');

  connection.query(
    "SELECT * FROM country WHERE Name LIKE '%A%' AND Capital LIKE '%Vienna'",
    (err, rows, fields) => {
      if (err) {
        console.log('Fehler bei der Abfrage:', err);
        res.status(500).send('Fehler bei der Datenbankabfrage');
        return;
      }
      res.json(rows);
    }
  );
});

app.listen(port, () => {                 //Starte den Server und höre auf Port 3000.
  console.log(`Example app listening on port ${port}`)
});
//--------------------------------------------------------------------
/* simples Diagramm mit den Schritten 
┌──────────────┐
│   Browser    │
│  (Frontend)  │
└──────┬───────┘
       │
GET /api/city?name=Berlin
       │
       ▼
┌──────────────┐
│   Express    │  ← dein Server
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  MySQL2 Lib  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Datenbank    │  ← z. B. Tabelle `city`
└──────────────┘
       │
       ▼
┌──────────────┐
│  Antwort     │ → JSON mit Daten
└──────────────┘

In TerminaL schreiben für lokalhost: 
C:\Digital Campus 1.1\SoftwareDeveloper_2025.02.Dornbirn\Work\Daniela\Week 12\mondial>npm run start
*/