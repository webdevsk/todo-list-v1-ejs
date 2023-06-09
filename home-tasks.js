const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [1, "No label no task"]
    },
    completed: Boolean,
})

mongoose.models = {}

exports.HomeTasks = mongoose.model('HomeTask', taskSchema)
exports.OfficeTasks = mongoose.model('OfficeTask', taskSchema)

console.log(module.exports)