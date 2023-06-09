const express = require('express')
const port = process.env.PORT || 3000
const Date = require('./date')
const mongoose = require('mongoose')
const {HomeTasks, OfficeTasks, getTasks, postTasks} = require('./databaseQuery')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: 'true'}))
app.use(express.static('public'))

//One time connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/todoDB')

app.get('/', async (req, res) => {
    // const officeTasks = await OfficeTask.find()
    const homeTasks = await getTasks('HomeTasks')
    const weekday = Date.getWeekDay()
    const date = Date.getDate()
    const listType = 'homeTasks'
    const listTitle = 'Home Tasks'
    res.render('todo', {weekday: weekday, date: date, todoList: homeTasks, listType: listType, listTitle: listTitle})
})

app.get('/office', async (req, res)=>{
    const officeTasks = await getTasks('OfficeTasks')
    const weekday = Date.getWeekDay()
    const date = Date.getDate()
    const listType = 'officeTasks'
    const listTitle = 'Office Tasks'
    res.render('todo', {weekday: weekday, date: date, todoList: officeTasks, listType: listType, listTitle: listTitle})
})

app.post('/', async (req, res) => {
    const {task, listType} = req.body

    if (listType === "homeTasks"){
        // homeTasks.push(task)
        await postTasks('HomeTasks', task)
        res.redirect('/')
    } else if (listType === "officeTasks"){
        // officeTasks.push(task)
        await postTasks('OfficeTasks', task)
        res.redirect('/office')
    }
})

app.listen(port, () => console.log('Server started on port ' + port))