const express = require('express')
const path = require('path');
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

app.use(express.static('public')) // Middleware to serve static files
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  const SQL_QUERY = "SELECT * FROM city WHERE country = 'A'"
  connection.query(SQL_QUERY, (err, results, fields) => {
    if (err != null){
        res.render('error', { err })
    } else {
        //console.log(results);
        //console.log(fields);
        res.render('index', { title: 'List of cities in Austria', fields, results });    
    }
  })
})

app.post('/cityDELETE', (req, res) => {
    console.log('/cityDELETE',  req.body);
    const SQL_DELETE = "DELETE FROM city WHERE name = ? AND country = 'A'"
    connection.execute(SQL_DELETE, [req.body.Name], (err, results, fields) => {
        if (err != null){
            res.render('error', { err })
        } else {
            res.redirect('/'); // Successfully deleted, redirect to the main page
        }
    })
})

app.post('/cityCREATE', (req, res) => {
    console.log('/cityCREATE',  req.body);
    const SQL_INSERT = "INSERT INTO city (Name, Province, Country) VALUES (?, ?, 'A')"
    connection.execute(SQL_INSERT, [req.body.Name, req.body.Name], (err, results, fields) => {
        if (err != null){
            res.render('error', { err })
        } else {
            res.redirect('/'); // Successfully inserted, redirect to the main page
        }
    })
})


app.listen(process.env.HTTP_PORT, () => {
  console.log(`Example app listening on port ${process.env.HTTP_PORT}`)
})
