const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    name: String,
    content: String,
    begin: String,
    end: String,
    completed: Boolean

})
todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo 