const mongoose =  require('mongoose')

const TodoScheme = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoScheme)
module.exports = TodoModel