const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 1
    },
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


// exports.category = Category

// getCategoryId('homes').then(ref => console.log(ref))
async function getCategoryId(categoryName){
    try {
        const ref = await Category.findOne({name: categoryName})
        return ref?.id
        // console.log(ref)
    } catch (error) {
        console.log(error)
    }
}


async function getCategoryList(){
    try {
        return await Category.find()
    } catch (error) {
        console.log(error)
    }
}

async function getTasks(categoryId){
    try {
        return await Task.find({category: categoryId}).populate('category')
    } catch (error) {
        console.log(error)
    }
}


async function postTask(category, task){
    try {
        const catId = await Category.findOneAndUpdate({name: category}, {}, {new: true,upsert: true})
        const result = await Task.insertMany([{category: catId, label: task}])
        console.log(result)
        } catch (error) {
        console.log(error)
    }
}

async function deleteTask(categoryName, taskId){
    try {
        const result = await Task.deleteOne({_id: taskId})
        console.log('Delete One:', result)
        //Delete whole category when there are no more tasks associated with it.
        if (categoryName === 'home') return
        const categoryId = await Category.findOne({name: categoryName})
        const tasksInCategory = await Task.find({ category: categoryId });
        if (tasksInCategory.length === 0) {
            const result = await Category.deleteOne({ _id: categoryId })
            console.log('Delete category:', result)
            return result.deletedCount
        }
    } catch (error) {
        console.log(error)
    }
}
  

async function deleteTasks(taskIdArr){
    try {
        await Task.deleteMany({_id: {$in: taskIdArr}})
    } catch (error) {
        console.log(error)
    }
}


async function updateTask(taskId, taskCompleted){
    try {
        const result = await Task.updateOne({_id: taskId}, {completed: taskCompleted})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}


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

exports.task = Task
exports.getCategoryId = getCategoryId
exports.getCategoryList = getCategoryList
exports.getTasks = getTasks
exports.postTask = postTask
exports.deleteTask = deleteTask
exports.deleteTasks = deleteTasks
exports.updateTask = updateTask
