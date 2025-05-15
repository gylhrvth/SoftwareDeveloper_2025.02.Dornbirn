
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

//-------------------------------------------------------------

// 4. Route: /
app.get('/api/test', (req, res) => {                        //Wenn du http://localhost:3000/ aufrufst, bekommst du einfach {"message": "Hello World!"} zurück.
  res.json({ message: 'Hello World!' })
});

//-------------------------------------------------------------

// 5. Rout:/api/country                               Neue Route: /api/country
app.get('/api/country', (req, res) => {             //Du holst dir 10 Länder aus der Tabelle country aus deiner Datenbank.
  console.log('GET /api/country')
  connection.query('SELECT * from country limit 10', (err, rows, fields) => { //Datenbank-Abfrage: Hole alle Länder aus der Tabelle country, aber nur die ersten 10.
    if (err) {
      res.status(503).json({ message: err.message })
    } else {
      res.json(rows)                              //Gib das Ergebnis als JSON zurück an den Browser.
    }
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
});






//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
// GET my Country
app.get('/api/my_country', (req, res) => {
  console.log('GET /api/my_country')
  connection.query("select name \
from country \
where name = 'Austria'", (err, rows, fields) => { 
  if (err) {
    res.status(503).json({ message: err.message })
  } else {
    res.json(rows)
  }
});
})
//--------------------------------------------------------------------------------------

app.get('/api/all_country', (req, res) => {
  console.log('GET /api/all_country')
  connection.query("select name \
from country \
limit 20;", (err, rows, fields) => { 
  if (err) {
    res.status(503).json({ message: err.message })
  } else {
    res.json(rows)
  }
});
})
//-----------------------------------------------------------------------------------------
app.get('/api/Vorarlberg_rivers', (reg, res) => {
  console.log('GET/api/Vorarlberg_rivers')
  connection.query("SELECT river.name as Name \
FROM geo_river \
JOIN river ON geo_river.river = river.name \
JOIN country ON geo_river.country = country.code \
WHERE country.name = 'Austria' and geo_river.Province ='Vorarlberg'", (err, rows, fields) => {
  if (err){
    res.status(503).json({message: err.message})
  } else{
    res.json(rows)
  }
});
})
//------------------------------------------------------------------------------------------

app.get('/api/Vorarlberg_Lake', (reg, res) => {
  console.log('GET/api/Vorarlberg_Lake')
  connection.query("select lake.name \
from geo_lake \
join lake on geo_lake.lake = lake.name \
where geo_lake.Province = 'Vorarlberg';", (err, rows, fields) => {
  if (err){
    res.status(503).json({message: err.message})
  } else{
    res.json(rows)
  }
});
})

//-----------------------------------------------------------------------------------
app.get('/api/bigesCity', (reg, res) => {
  console.log('GET/api/bigestCity')
  connection.query("SELECT encompasses.continent AS Continent, \
       AVG(City.Population) AS AvgPopulation \
FROM Country \
JOIN encompasses ON Country.code = encompasses.country \
JOIN City ON Country.code = City.Country \
GROUP BY encompasses.continent \
ORDER BY AvgPopulation DESC \
LIMIT 3;", (err, rows, fields) => {
  if (err){
    res.status(503).json({message: err.message})
  } else{
    res.json(rows)
  }
});
})
//--------------------------------------------------------------------------------------------

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


