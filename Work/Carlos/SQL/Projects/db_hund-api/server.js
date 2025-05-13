const express = require('express')
const mysql = require('mysql2')
const result = require('dotenv').config()
if (result.error) {
    console.error('Don\'t forget to create the .env file with:\n\
SQL_SERVER=localhost\n\
SQL_USER=********\n\
SQL_PASSWORD=************\n\
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

app.get('/API/hund', (req, res) => {
    const SQL_QUERY = "SELECT Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung FROM Hund";
    connection.query(SQL_QUERY, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

app.delete('/API/hund', (req, res) => {
    console.log('DELETE /API/hund',  req.body);
    const SQL_DELETE = "DELETE FROM hund WHERE Hund_Name = ?"
    connection.execute(SQL_DELETE, [req.body.Hund_Name], (err, results, fields) => {
        if (err != null){
            res.status(500).json({ error: err })
        } else {
            res.status(200).json({ message: 'Hund successfully deleted' }); // Successfully deleted
        }
    })
})

app.post('/API/hund', (req, res) => {
    console.log('POST /API/hund',  req.body);
    const SQL_INSERT = "INSERT INTO hund (Hund_Name, Hund_Rasse, Hund_Geschlecht, Hund_Einlieferung) VALUES (?, ?, ?, ?)"
    connection.execute(SQL_INSERT, [req.body.Hund_Name, req.body.Hund_Rasse, req.body.Hund_Geschlecht, req.body.Hund_Einlieferung], (err, results, fields) => {
        if (err != null){
            res.status(500).json({ error: err })
        } else {
            res.status(201).json({ message: 'Hund successfully created' }); // Successfully inserted, redirect to the main page
        }
    })
})


app.listen(process.env.HTTP_PORT, () => {
  console.log(`Example app listening on port ${process.env.HTTP_PORT}`)
})
