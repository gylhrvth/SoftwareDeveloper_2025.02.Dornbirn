const express = require('express')
const { v4: uuidv4 } = require('uuid');
const Jabber = require("jabber").default;
const app = express()
const port = 3000

const ipWithErrors = [
  {
    ip: '192.168.0.62',
    errorProbability: 0.05,
    longlist: true
  },
]
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

console.log(Jabber)
const jabber = new Jabber();
for (let i = 0; i < 555; i++) {
  todos.push({
    id: uuidv4(),
    title: jabber.createParagraph(5 + Math.floor(Math.random() * 5)),
    description: jabber.createParagraph(5 + Math.floor(Math.random() * 40)),
    dueDate: '2023-10-01',
    complete: Math.random() < 0.5 ? false : true,
    responsible: users[Math.floor(Math.random() * users.length)],
    createdBy: 'Gyula',
    createdAt: new Date(),
    updatedAt: new Date(),
    magic: true,
  })
}

app.get('/api/todo', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`${ip}: GET /api/todo`)
  const errorProbability = ipWithErrors.find(obj => obj.ip === ip)?.errorProbability || 0
  if (Math.random() < errorProbability) {    console.log('Simulating error')
    res.status(408).send('Request Timeout')
    return
  }
  const longList = ipWithErrors.find(obj => obj.ip === ip)?.longlist || false
  const filteredTodos = todos.filter(todo => {
    if (longList){
      return true
    } else if (todo.magic === undefined || todo.magic == false) {
      return true
    } else {
      return false
    }
  })
  console.log('filteredTodos: ', filteredTodos.length)

  res.json(filteredTodos.map(todo => {
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
  
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`${ip}: GET /api/todo/${req.params.id}`)
  const errorProbability = ipWithErrors.find(obj => obj.ip === ip)?.errorProbability || 0
  if (Math.random() < errorProbability) {
    console.log('Simulating error')
    res.status(408).send('Request Timeout')
    return
  }  
    
  res.json(todo)
})


app.post('/api/todo', (req, res) => {
  if (!req.body.title) {
    return res.status(400).send('Fehlende Angabe: title')
  }
  if (req.body.dueDate && isNaN(Date.parse(req.body.dueDate))) {
    return res.status(400).send('Ungültiges Datumformat: dueDate')

  }
  if (req.body.complete && isNaN(Boolean(req.body.complete))) {
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

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`${ip}: POST /api/todo`)
  const errorProbability = ipWithErrors.find(obj => obj.ip === ip)?.errorProbability || 0
  if (Math.random() < errorProbability) {
    console.log('Simulating error')
    res.status(408).send('Request Timeout')
    return
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
  if (req.body.dueDate && isNaN(Date.parse(req.body.dueDate))) {
    return res.status(400).send('Ungültiges Datumformat: dueDate')
  }
  if (req.body.complete && isNaN(Boolean(req.body.complete))) {
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
 
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`${ip}: PUT /api/todo/${req.params.id}`)
  const errorProbability = ipWithErrors.find(obj => obj.ip === ip)?.errorProbability || 0
  if (Math.random() < errorProbability) {
    console.log('Simulating error')
    res.status(408).send('Request Timeout')
    return
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
    
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`${ip}: DELETE /api/todo/${req.params.id}`)
  const errorProbability = ipWithErrors.find(obj => obj.ip === ip)?.errorProbability || 0
  if (Math.random() < errorProbability) {
    console.log('Simulating error')
    res.status(408).send('Request Timeout')
    return
  }  

  todos.splice(todoIndex, 1)
  res.json({
    "message": `ToDo with id = ${req.params.id}, has been deleted.`
  })
})

app.patch('/api/todo/:id', (req, res) => {
  const selectedTodo = todos.find(todo => todo.id === req.params.id)
  if (!selectedTodo) return res.status(404).send('The object with the given ID was not found.')

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(`${ip}: PATCH /api/todo/${req.params.id}`)
    const errorProbability = ipWithErrors.find(obj => obj.ip === ip)?.errorProbability || 0
    if (Math.random() < errorProbability) {
      console.log('Simulating error')
      res.status(408).send('Request Timeout')
      return
    } 

  if (req.body.title) {
    selectedTodo.title = req.body.title
  }
  if (req.body.description) {
    selectedTodo.description = req.body.description
  }
  if (req.body.dueDate) {
    if (isNaN(Date.parse(req.body.dueDate))) {
      return res.status(400).send('Ungültiges Datumformat: dueDate')
    }
    selectedTodo.dueDate = req.body.dueDate
  }
  if (req.body.complete !== undefined) {
    if (isNaN(Boolean(req.body.complete))) {
      return res.status(400).send('Ungültiges Format: complete')
    }
    selectedTodo.complete = req.body.complete
  }
  if (req.body.responsible) {
    if (!users.includes(req.body.responsible)) {
      return res.status(400).send('Ungültige Angabe: responsible')
    }
    selectedTodo.responsible = req.body.responsible
  }
  if (req.body.createdBy) {
    if (!users.includes(req.body.createdBy)) {
      return res.status(400).send('Ungültige Angabe: createdBy')
    }
    selectedTodo.createdBy = req.body.createdBy
  }

  selectedTodo.updatedAt = new Date()
  res.json(selectedTodo)
})


app.post('/api/error', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`${ip}: POST /api/error`)

  let config = ipWithErrors.find(obj => obj.ip === ip)
  if (config === undefined) {
    config = {
      ip: ip,
      errorProbability: req.body.errorProbability !== undefined ? req.body.errorProbability : 0.05,
      longlist: req.body.longlist !== undefined ? req.body.longlist : true
    }
    ipWithErrors.push(config)
  } else {
    config.errorProbability = req.body.errorProbability !== undefined ? req.body.errorProbability : 0.05
    config.longlist = req.body.longlist !== undefined ? req.body.longlist : config.longlist
  }
  console.log('ipWithErrors: ', ipWithErrors)

  res.status(201).json(config)
})


app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})

