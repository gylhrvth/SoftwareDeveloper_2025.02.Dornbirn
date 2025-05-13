const express = require('express')
const mysql = require('mysql2')
const result = require('dotenv').config()
if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=root\n\
SQL_PASSWORD=root\n\
SQL_DATABASE=mondial\n\
HTTP_PORT')
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
//app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.json()); // Middleware to parse JSON data

app.get('/API/city', (req, res) => {
  const SQL_QUERY = "SELECT * FROM city WHERE country = 'A'"
  connection.query(SQL_QUERY, (err, results, fields) => {
    if (err != null){
        res.status(500).json({ error: err })
    } else {
        //console.log(results);
        //console.log(fields);
        res.json(results);    
    }
  })
})

app.delete('/API/city', (req, res) => {
    console.log('DELETE /API/city',  req.body);
    const SQL_DELETE = "DELETE FROM city WHERE name = ? AND country = 'A'"
    connection.execute(SQL_DELETE, [req.body.Name], (err, results, fields) => {
        if (err != null){
            res.status(500).json({ error: err })
        } else {
            res.status(200).json({ message: 'City successfully deleted' }); // Successfully deleted
        }
    })
})

app.post('/API/city', (req, res) => {
    console.log('POST /API/city',  req.body);
    const SQL_INSERT = "INSERT INTO city (Name, Province, Country) VALUES (?, ?, 'A')"
    connection.execute(SQL_INSERT, [req.body.Name, req.body.Name], (err, results, fields) => {
        if (err != null){
            res.status(500).json({ error: err })
        } else {
            res.status(201).json({ message: 'City successfully created' }); // Successfully inserted, redirect to the main page
        }
    })
})


app.listen(process.env.HTTP_PORT, () => {
  console.log(`Example app listening on port ${process.env.HTTP_PORT}`)
})