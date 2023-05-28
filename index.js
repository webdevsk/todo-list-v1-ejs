const express = require('express')
const port = process.env.PORT || 3000
const Date = require('./date')

const homeTasks = ["Wake up", "Brush teeth"]
const officeTasks = ["Setup a meeting", "Call secretarty"]

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: 'true'}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    const weekday = Date.getWeekDay()
    const date = Date.getDate()
    const listType = 'homeTasks'
    const listTitle = 'Home Tasks'
    res.render('todo', {weekday: weekday, date: date, todoList: homeTasks, listType: listType, listTitle: listTitle})
})

app.get('/office', (req, res)=>{
    const weekday = Date.getWeekDay()
    const date = Date.getDate()
    const listType = 'officeTasks'
    const listTitle = 'Office Tasks'
    res.render('todo', {weekday: weekday, date: date, todoList: officeTasks, listType: listType, listTitle: listTitle})
})

app.post('/', (req, res) => {
    const {task, listType} = req.body

    if (listType === "homeTasks"){
        homeTasks.push(task)
        res.redirect('/')
    } else if (listType === "officeTasks"){
        officeTasks.push(task)
        res.redirect('/office')
    }
})

app.listen(port, () => console.log('Server started on port ' + port))