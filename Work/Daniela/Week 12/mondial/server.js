const express = require('express')
const mysql = require('mysql2')

require('dotenv').config()
// console.log(process.env)


const connection = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB
  })
connection.connect()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

app.get('/api/country', (req, res) => {
    console.log('GET /api/country')
    connection.query('SELECT * from country limit 10', (err, rows, fields) => {
        if (err) throw err

        res.json(rows)
      })
  })


  app.get('/api/city', (req, res) => {
    console.log('GET /api/city ' + req.query.name)
    const queryString = '%' + (req.query.name != undefined ? req.query.name:'') + '%'
    console.log(queryString)

    connection.query('SELECT * from city where name like ? limit 10', [queryString], (err, rows, fields) => {
        if (err) throw err

        res.json(rows)
      })
  })


  app.get('/api/city/addpopulation', (req, res) => {
    console.log('GET /api/city/addpopulation ' + req.query.name)
    const queryString = req.query.name != undefined ? req.query.name:''

    connection.execute('update city set Population = Population + 1 where city.name = ?', [queryString], (err, result, fields) => {
        if (err instanceof Error) {
          console.log(err);
          return;
        }
      
        console.log(result);
        console.log(fields);

        res.json(result)
      });
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
