const express = require('express')
const port = process.env.PORT || 3000
const Date = require('./date')
const mongoose = require('mongoose')
const cors = require('cors')
const {getCategoryId, getTasks, postTask, deleteTask, deleteTasks, updateTask} = require('./databaseQuery')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: 'true'}))
app.use(express.static('public'))
const corsOptions = {
    origin: 'https://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

//One time connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/todoDB')

app.get('/', async (req, res) => {
    const weekday = Date.getWeekDay()
    const date = Date.getDate()
    const category = 'home'
    const categoryId = await getCategoryId(category)
    const homeTasks = await getTasks(categoryId)
    res.render('todo', {weekday: weekday, date: date, todoList: homeTasks, category: category})
})

app.post('/', async (req, res) => {
    const {task, category} = req.body

    await postTask(category, task)
    res.redirect('/')
})

app.post('/checkStatus', async (req, res) => {
    const {taskId, completed} = req.body
    await updateTask(taskId, completed && completed === 'on' ? true : false)
    res.redirect('/')
})

app.listen(port, () => console.log('Server started on port ' + port))