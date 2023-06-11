const express = require('express')
const port = process.env.PORT || 3000
require('dotenv').config()
const Date = require('./date')
const mongoose = require('mongoose')
const cors = require('cors')
const {getCategoryId, getCategoryList, getTasks, postTask, deleteTask, deleteTasks, updateTask} = require('./databaseQuery')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: 'true'}))
app.use(express.static('public'))
const corsOptions = {
    origin: ['https://localhost:3000/', 'https://todolistv1ejs.onrender.com'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

//One time connect to DB
let DBURI
process.env.APP_ONLINE === 'true'
? DBURI = process.env.DB_URI
: DBURI = `mongodb://127.0.0.1:27017/todoDB`
mongoose.connect(DBURI)

app.get('/', async (req, res) => {
    res.redirect('/home')
})

app.get('/:pageId', async (req, res) => {
    const category = req.params.pageId.toLowerCase()
    const catId = await getCategoryId(category)
    res.render('todo', {
        weekday:    Date.getWeekDay(),
        date:       Date.getDate(),
        category:   category,
        categoryList: await getCategoryList(),
        categoryId: catId,
        todoList:   await getTasks(catId)
    })
})


app.post('/:pageId', async (req, res) => {
    const {task} = req.body
    const category = req.params.pageId.toLowerCase()
    // const catId = await getCategoryId(category)
    await postTask(category, task)
    res.redirect('/' + category ?? '')
})

app.post('/update/status', async (req, res) => {
    const {taskId, completed, category} = req.body
    await updateTask(taskId, completed && completed === 'on' ? true : false)
    res.redirect('/' + category ?? '')
})

app.get('/update/delete', async (req, res) => {
    const {category, id} = req.query
    if (id === '' || id === '*') res.redirect('/' + category ?? '')
    const result = await deleteTask(category, id)
    result > 0 ? res.redirect('/') : res.redirect('/' + category ?? '')
})

app.listen(port, () => console.log('Server started on port ' + port))