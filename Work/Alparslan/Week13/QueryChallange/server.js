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


app.get('/aufgabe1', (req, res) => {
    connection.query(" \
SELECT Height FROM mountain where name = 'Ararat' \
", (err, rows, fields) => {
        if (err) throw err

        res.render('pages/index', {
            title: 'Einwohner von Österreich',
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




