const express = require('express')
const mysql = require('mysql2')

const result = require('dotenv').config()
if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=********\n\
SQL_PASSWORD=************\n\
SQL_DATABASE=mondial\n\
HTTP_PORT=3000\n')
    process.exit(1)
  }

const connection = mysql.createConnection({
  host: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

const app = express()

app.set('view engine', 'ejs')

// Aufgabe1 Einwohner Österreich 
app.get('/aufgabe1-EinwohnerAT', (req, res) => {
    connection.query(" \
SELECT Name, Population \
FROM country \
WHERE Name = 'Austria'; \
", (err, rows, fields) => {
        console.log(rows)

        if (err) throw err

        res.render('pages/index', {
            title: 'Einwohner von Österreich (by Alp)',
            header: fields,
            content: rows
        })
      })
})

// Aufgabe2 Einwohner Europa 
app.get('/aufgabe2-EinwohnerEU', (req, res) => {
    connection.query(" \
SELECT \
SUM(country.Population) AS Total_population \
FROM country \
JOIN encompasses ON country.code = encompasses.Country \
WHERE encompasses.Continent = 'Europe'; \
", (err, rows, fields) => {
        console.log(rows)

        if (err) throw err

        res.render('pages/index', {
            title: 'Einwohner von EU (by Alp)',
            header: fields,
            content: rows
        })
      })
})

// Aufgabe3 Flüsse in AT 
app.get('/aufgabe3-FlüsseinAT', (req, res) => {
    connection.query(" \
SELECT \
SUM(country.Population) AS Total_population \
FROM country \
JOIN encompasses ON country.code = encompasses.Country \
WHERE encompasses.Continent = 'Europe'; \
", (err, rows, fields) => {
        console.log(rows)

        if (err) throw err

        res.render('pages/index', {
            title: 'Flüsse in AT (by Alp)',
            header: fields,
            content: rows
        })
      })
})

// Aufgabe4 Fluesse in EU 
app.get('/aufgabe4-FluesseinEU', (req, res) => {
    connection.query(" \
SELECT gr.River \
FROM geo_river gr \
JOIN country c ON gr.Country = c.Code \
JOIN encompasses e ON c.Code = e.Country \
GROUP BY gr.River \
HAVING COUNT(DISTINCT CASE WHEN e.Continent = 'Europe' THEN 1 END) = COUNT(DISTINCT gr.Country); \
", (err, rows, fields) => {
        console.log(rows)

        if (err) throw err

        res.render('pages/index', {
            title: 'Flüsse in EU (by Alp)',
            header: fields,
            content: rows
        })
      })
})

// Aufgabe5 People in EU 
app.get('/aufgabe5-PeopleinEU', (req, res) => {
    connection.query(" \
SELECT \
(europe.Population / world.TotalPopulation) * 100 AS PercentageInEurope \
FROM (SELECT SUM(country.Population) AS Population \
FROM country \
JOIN encompasses ON country.Code = encompasses.Country \
WHERE encompasses.Continent = 'Europe') AS europe, \
(SELECT SUM(Population) AS TotalPopulation FROM country) AS world; \
", (err, rows, fields) => {
        console.log(rows)

        if (err) throw err

        res.render('pages/index', {
            title: 'Eu-Bevölkerung der EU in Prozent (by Alp)',
            header: fields,
            content: rows
        })
      })
})

// Aufgabe6 People in EU 
app.get('/aufgabe6-LaendermitA', (req, res) => {
    connection.query(" \
SELECT Name \
FROM country \
WHERE Name LIKE 'A%'; \
", (err, rows, fields) => {
        console.log(rows)

        if (err) throw err

        res.render('pages/index', {
            title: 'Alle Länder die mit A anfangen (by Alp)',
            header: fields,
            content: rows
        })
      })
})





/*
// Original examples 
app.get('/', (req, res) => {
    connection.query(" \
SELECT * FROM country \
", (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'Berge in der Welt',
            header: fields,
            content: rows
        })
      })
})


app.get('/religion', (req, res) => {
    connection.query("SELECT Religion.Name, Round(country.Population * religion.Percentage / 100) religPeople FROM religion \
JOIN country ON religion.country = country.code \
WHERE country.Name = ?", [req.query.name], (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'Religions in ' + req.query.name,
            header: fields,
            content: rows,
            searchAction: 'religion',
            searchField: 'name'
        })
      })
})


app.get('/sport', (req, res) => {
  let queryCriteria = req.query.name + '%'
    connection.query("  \
select Country.name country, religion.Name religion \
from religion \
join country on country.code = religion.Country \
where religion.name like ? \
order by country, religion \
", [queryCriteria], (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'Religions in ' + req.query.name,
            header: fields,
            content: rows,
            searchAction: 'sport',
            searchField: 'name'
        })
      })
})

*/


app.listen(process.env.HTTP_PORT, () => {
    console.log(`App listening on port ${process.env.HTTP_PORT}`)
  })




