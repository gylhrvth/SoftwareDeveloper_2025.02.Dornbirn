const express = require('express')
const app = express()
const port = 3000

let objects = [
  { id: 1, name: 'Object 1' },
  { id: 2, name: 'Object 2' },
  { id: 3, name: 'Object 3' },
  { id: 7, name: 'Object 7' },
]
let lastId = 7

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors = require('cors')
app.use(cors())

app.get('/objects', (req, res) => {
  res.json(objects)
})

app.get('/objects/:id', (req, res) => {
  const object = objects.find(obj => obj.id === parseInt(req.params.id))
  if (!object) return res.status(404).send('The object with the given ID was not found.')
  res.json(object)
})

app.post('/objects', (req, res) => {
  lastId++
  const object = {
    id: lastId,
    name: req.body.name,
    data: req.body.data
  }
  objects.push(object)
  object.createdAt = new Date()
  res.status(201).json(object)
})

app.put('/objects/:id', (req, res) => {
  const object = objects.find(obj => obj.id === parseInt(req.params.id))
  if (!object) return res.status(404).send('The object with the given ID was not found.')

  object.name = req.body.name
  object.data = req.body.data
  object.updatedAt = new Date()
  res.json(object)
})

app.delete('/objects/:id', (req, res) => {
  const objectIndex = objects.findIndex(obj => obj.id === parseInt(req.params.id))
  if (objectIndex === -1) return res.status(404).send('The object with the given ID was not found.')

  const deletedObject = objects.splice(objectIndex, 1)
  res.json({
    "message": `Object with id = ${req.params.id}, has been deleted.`
  })
})

app.patch('/objects/:id', (req, res) => {
  const object = objects.find(obj => obj.id === parseInt(req.params.id))
  if (!object) return res.status(404).send('The object with the given ID was not found.')

  if (req.body.name) {
    object.name = req.body.name
  }
  if (req.body.data) {
    if (!object.data) {
        object.data = {}
    }
    for (const key in req.body.data) {
      if (req.body.data.hasOwnProperty(key)) {
        object.data[key] = req.body.data[key]
      }
    }
  }
  object.updatedAt = new Date()
  res.json(object)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

