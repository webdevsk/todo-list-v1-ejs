const express = require('express')
const port = process.env.PORT || 3000
const todoList = ["Wake up", "Brush teeth"]

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: 'true'}))
app.use(express.static('public'))

function getWeekDay(){
    const today = new Date()
    return today.toLocaleDateString('en-US', {weekday: "long"})
}

app.get('/', (req, res) => {
    const weekday = getWeekDay()
    res.render('todo', {weekday: weekday, todoList: todoList})
})

app.post('/', (req, res) => {
    const task = req.body.task
    todoList.push(task)
    res.redirect('/')
})

app.listen(port, () => console.log('Server started on port ' + port))