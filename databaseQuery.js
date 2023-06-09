const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [1, "No label no task"]
    },
    completed: Boolean,
})

mongoose.models = {}

const HomeTasks = mongoose.model('HomeTask', taskSchema)
exports.HomeTasks = HomeTasks

const OfficeTasks = mongoose.model('OfficeTask', taskSchema)
exports.OfficeTasks = OfficeTasks

async function getTasks(taskType){
    try {
        let data
        if (taskType === 'HomeTasks') data = await HomeTasks.find()
        if (taskType === 'OfficeTasks') data = await OfficeTasks.find()
        return data
    } catch (err) {
        console.log(err)
    }
}

exports.getTasks = getTasks

async function postTasks(taskType, task){
    try {
        let data
        if (taskType === 'HomeTasks'){
            await HomeTasks.insertMany([{label: task}])
        }
        if (taskType === 'OfficeTasks'){
            await OfficeTasks.insertMany([{label: task}])
        }
    } catch (err) {
        console.log(err)
    }
}

exports.postTasks = postTasks