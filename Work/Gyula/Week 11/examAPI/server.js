const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

let users = [
  'Daniela', 'Leonie', 'Carlos', 'Görkem', 'Alp', 'Sandro', 'Gyula'
]

let todos = [
  {
    "id": 1,
    "name": "Google Pixel 6 Pro",
    "data": {
      "color": "Cloudy White",
      "capacity": "128 GB"
    }
  },
  {
    "id": 2,
    "name": "Apple iPhone 12 Mini, 256GB, Blue",
    "data": null
  },
  {
    "id": 3,
    "name": "Apple iPhone 12 Pro Max",
    "data": {
      "color": "Cloudy White",
      "capacity GB": 512
    }
  },
  {
    "id": 4,
    "name": "Apple iPhone 11, 64GB",
    "data": {
      "price": 389.99,
      "color": "Purple"
    }
  },
  {
    "id": 5,
    "name": "Samsung Galaxy Z Fold2",
    "data": {
      "price": 689.99,
      "color": "Brown"
    }
  },
  {
    "id": 6,
    "name": "Apple AirPods",
    "data": {
      "generation": "3rd",
      "price": 120
    }
  },
  {
    "id": 7,
    "name": "Apple MacBook Pro 16",
    "data": {
      "year": 2019,
      "price": 1849.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB"
    }
  },
  {
    "id": 8,
    "name": "Apple Watch Series 8",
    "data": {
      "Strap Colour": "Elderberry",
      "Case Size": "41mm"
    }
  },
  {
    "id": 9,
    "name": "Beats Studio3 Wireless",
    "data": {
      "Color": "Red",
      "Description": "High-performance wireless noise cancelling headphones"
    }
  },
  {
    "id": 10,
    "name": "Apple iPad Mini 5th Gen",
    "data": {
      "Capacity": "64 GB",
      "Screen size": 7.9
    }
  },
  {
    "id": 11,
    "name": "Apple iPad Mini 5th Gen",
    "data": {
      "Capacity": "254 GB",
      "Screen size": 7.9
    }
  },
  {
    "id": 12,
    "name": "Apple iPad Air",
    "data": {
      "Generation": "4th",
      "Price": "419.99",
      "Capacity": "64 GB"
    }
  },
  {
    "id": 13,
    "name": "Apple iPad Air",
    "data": {
      "Generation": "4th",
      "Price": "519.99",
      "Capacity": "256 GB"
    }
  }
]


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const cors = require('cors')
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true
}))




app.get('/api/todo', (req, res) => {
  res.json(todos)
})

app.get('/api/todo/:id', (req, res) => {
  const todo = todos.find(obj => obj.id === parseInt(req.params.id))
  if (!todo) return res.status(404).send('The TODO with the given ID was not found.')
  res.json(todo)
})

app.post('/api/todo', (req, res) => {
  if (Date.parse(req.body.dueDate) === NaN) {
    return res.status(400).send('Ungültiges Datumformat: dueDate')
  }
  if (Boolean(req.body.complete) === NaN) {
    return res.status(400).send('Ungültiges Format: complete')
  }
  if (users.includes(req.body.responsible) === NaN) {
    return res.status(400).send('Ungültige Angabe: responsible')
  }

  const todo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    complete: req.body.compplete,
    responsible: req.body.responsible,
    createdBy: req.body.createdBy,
    createdAt: new Date(),
  }
  todos.push(todo)
  res.status(201).json(todo)
})

app.put('/api/todo/:id', (req, res) => {
  const todo = todos.find(obj => obj.id === parseInt(req.params.id))
  if (!todo) return res.status(404).send('The object with the given ID was not found.')

  if (Date.parse(req.body.dueDate) === NaN) {
    return res.status(400).send('Ungültiges Datumformat: dueDate')
  }
  if (Boolean(req.body.complete) === NaN) {
    return res.status(400).send('Ungültiges Format: complete')
  }
  if (users.includes(req.body.responsible) === NaN) {
    return res.status(400).send('Ungültige Angabe: responsible')
  }

  todo.title = req.body.title
  todo.description = req.body.description
  todo.dueDate = req.body.dueDate
  todo.complete = req.body.complete
  todo.responsible = req.body.responsible
  todo.createdBy = req.body.createdBy
  todo.updatedAt = new Date()
  res.json(todo)
})

app.delete('/api/todo/:id', (req, res) => {
  const objectIndex = todos.findIndex(obj => obj.id === parseInt(req.params.id))
  if (objectIndex === -1) return res.status(404).send('The object with the given ID was not found.')

  const deletedObject = todos.splice(objectIndex, 1)
  res.json({
    "message": `Object with id = ${req.params.id}, has been deleted.`
  })
})

app.patch('/api/todo/:id', (req, res) => {
  const object = todos.find(obj => obj.id === parseInt(req.params.id))
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

