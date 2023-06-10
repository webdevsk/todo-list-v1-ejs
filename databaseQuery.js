const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: String,
})

const Category = mongoose.model('category', categorySchema)

const taskSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [1, "No label no task"]
    },
    completed: Boolean,
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    }
})
const Task = mongoose.model('task', taskSchema)

mongoose.models = {}

exports.task = Task

// exports.category = Category
getCategoryId('home').then(data => console.log(data))
async function getCategoryId(categoryName){
    try {
        const ref = await Category.findOneAndUpdate({name: categoryName}, {}, {upsert:true})
        return ref.id
    } catch (error) {
        console.log(error)
    }
}

exports.getCategoryId = getCategoryId

async function getTasks(categoryId){
    try {
        return await Task.find({category: categoryId}).populate('category')
    } catch (error) {
        console.log(error)
    }
}

exports.getTasks = getTasks

async function postTask(category, task){
    try {
        await Task.insertMany([{category: category, label: task}])
    } catch (error) {
        console.log(error)
    }
}

exports.postTask = postTask

async function deleteTask(taskId){
    try {
        await Task.deleteOne({_id: taskId})
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTask = deleteTask

async function deleteTasks(taskIdArr){
    try {
        await Task.deleteMany({_id: {$in: taskIdArr}})
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTasks = deleteTasks

async function updateTask(taskId, taskCompleted){
    console.log(taskCompleted)
    try {
        const res = await Task.updateOne({_id: taskId}, {completed: taskCompleted})
        console.log(res.modifiedCount)
    } catch (error) {
        console.log(error)
    }
}

exports.updateTask = updateTask

// Run once to populate empty tasks
// postprebuiltTasks('648463c23a0d1fadf66b8928')

async function postprebuiltTasks(id){
    try {
        await Task.insertMany([
            {
                label: 'Welcome to Sam\'s TODOList', category: id
            },
            {
                label: '<=== Click here if task is done', category: id
            },
            {
                label: 'Click here to remove the task ===>', category: id
            }
        ])
    } catch (error) {
        console.log(error)
    }
}
// Delete all prebuilt tasks

// deleteAll()
async function deleteAll(){
    try{
        await Task.deleteMany()
    } catch (error){console.log(error)}
}