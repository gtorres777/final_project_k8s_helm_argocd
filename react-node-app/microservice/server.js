const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const taskController = require('./controller/task.controller')

const app = express()
const port = process.env.PORT || 5000

// let express to use this

app.use(cors())
app.use(bodyParser.json())

app.use('/api/healthcheck', require('./healthcheck/healthchecker'))

app.get('/api/tasks', (req, res) => {
  taskController.getTasks().then(data => res.json(data))
})

app.post('/api/task', (req, res) => {
  console.log(req.body)
  taskController.createTask(req.body.task).then(data => res.json(data))
})

app.put('/api/task', (req, res) => {
  taskController.updateTask(req.body.task).then(data => res.json(data))
})

app.delete('/api/task/:id', (req, res) => {
  taskController.deleteTask(req.params.id).then(data => res.json(data))
})

app.listen(port, () => {
  console.log(`Stage Server listening on port the ${port}`)
})
