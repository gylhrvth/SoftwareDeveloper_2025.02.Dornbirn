const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

let users = [
  'Daniela', 'Leonie', 'Carlos', 'Görkem', 'Alp', 'Sandro', 'Gyula'
]

let todos = [
  {
    id: '123-456-232312313123131313',
    title: 'Test',
    description: 'Test Description',
    dueDate: '2023-10-01',
    complete: false,
    responsible: 'Daniela',
    createdBy: 'Gyula',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '123-456-232312313123131314',
    title: 'Test 2',
    description: 'Test Description 2',
    dueDate: '2023-10-02',
    complete: true,
    responsible: 'Leonie',
    createdBy: 'Gyula',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '123-456-232312313123131315',
    title: 'Test 3',
    description: 'Test Description 3',
    dueDate: '2023-10-03',
    complete: false,
    responsible: 'Carlos',
    createdBy: 'Gyula',
    createdAt: new Date(),
    updatedAt: new Date(),
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
  res.json(todos.map(todo => {
    return {
      id: todo.id,
      title: todo.title,
      complete: todo.complete,
    }
  }
  ))
})

app.get('/api/todo/:id', (req, res) => {
  const todo = todos.find(obj => obj.id === req.params.id)
  if (!todo) return res.status(404).send('The TODO with the given ID was not found.')
  res.json(todo)
})

app.post('/api/todo', (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('Fehlende Angabe: title')
  }
  if (req.body.dueDate && Date.parse(req.body.dueDate) === NaN) {
    return res.status(400).send('Ungültiges Datumformat: dueDate')
  }
  if (req.body.complete && Boolean(req.body.complete) === NaN) {
    return res.status(400).send('Ungültiges Format: complete')
  }
  if (req.body.responsible && users.includes(req.body.responsible) === false) {
    return res.status(400).send('Ungültige Angabe: responsible')
  }
  if (!req.body.createdBy){
    return res.status(400).send('Fehlende Angabe: createdBy')
  }
  if (users.includes(req.body.createdBy) === false) {
    return res.status(400).send('Ungültige Angabe: createdBy')
  }

  const todo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    complete: req.body.compplete ? req.body.complete : false,
    responsible: req.body.responsible,
    createdBy: req.body.createdBy,
    createdAt: new Date(),
  }
  todos.push(todo)
  res.status(201).json(todo)
})

app.put('/api/todo/:id', (req, res) => {
  const todo = todos.find(obj => obj.id === req.params.id)
  if (!todo) return res.status(404).send('The object with the given ID was not found.')

  if (!req.body.title) {
    return res.status(400).send('Fehlende Angabe: title')
  }
  if (req.body.dueDate && Date.parse(req.body.dueDate) === NaN) {
    return res.status(400).send('Ungültiges Datumformat: dueDate')
  }
  if (req.body.complete && Boolean(req.body.complete) === NaN) {
    return res.status(400).send('Ungültiges Format: complete')
  }
  if (req.body.responsible && users.includes(req.body.responsible) === false) {
    return res.status(400).send('Ungültige Angabe: responsible')
  }
  if (!req.body.createdBy){
    return res.status(400).send('Fehlende Angabe: createdBy')
  }
  if (users.includes(req.body.createdBy) === false) {
    return res.status(400).send('Ungültige Angabe: createdBy')
  }

  todo.title = req.body.title
  todo.description = req.body.description
  todo.dueDate = req.body.dueDate
  todo.complete = req.body.complete ? req.body.complete : false
  todo.responsible = req.body.responsible
  todo.createdBy = req.body.createdBy
  todo.updatedAt = new Date()
  res.json(todo)
})

app.delete('/api/todo/:id', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === req.params.id)
  if (todoIndex === -1) return res.status(404).send('The object with the given ID was not found.')

  todos.splice(todoIndex, 1)
  res.json({
    "message": `ToDo with id = ${req.params.id}, has been deleted.`
  })
})

app.patch('/api/todo/:id', (req, res) => {
  const selectedTodo = todos.find(todo => todo.id === req.params.id)
  if (!selectedTodo) return res.status(404).send('The object with the given ID was not found.')

  if (req.body.title) {
    selectedTodo.title = req.body.title
  }
  if (req.body.description) {
    selectedTodo.description = req.body.description
  }
  if (req.body.dueDate) {
    selectedTodo.dueDate = req.body.dueDate
  }
  if (req.body.complete !== undefined) {
    selectedTodo.complete = req.body.complete
  }
  if (req.body.responsible) {
    selectedTodo.responsible = req.body.responsible
  }
  if (req.body.createdBy) {
    selectedTodo.createdBy = req.body.createdBy
  }

  selectedTodo.updatedAt = new Date()
  res.json(selectedTodo)
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

