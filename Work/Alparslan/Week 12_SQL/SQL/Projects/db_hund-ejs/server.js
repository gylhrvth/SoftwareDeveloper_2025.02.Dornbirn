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

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.use(express.static('public'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    connection.query("SELECT * FROM Hund", (err, rows, fields) => {
        if (err) throw err

        //console.log(rows)

        res.render('pages/index', {
            content: rows
        })
      })
})

app.post('/DELETE_HUND', (req, res) => {
    console.log('DELETE', req.body)
    connection.query("DELETE FROM Hund WHERE Hund_ID = ?", [req.body.Hund_ID], (err, rows, fields) => {
        if (err) throw err

        res.redirect('/')
      })
})

/*
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
*/


app.listen(process.env.HTTP_PORT, () => {
    console.log(`App listening on port ${process.env.HTTP_PORT}`)
  })




