const Todo = require('../models/notes')
const moment = require('moment');


moment().format();
const day = moment().format('DD.MM.YY')
const klo = moment().format('HH:mm:ss')
const time = day + "  klo: " + klo
//const time = moment().format('DD.MM.YYYY  HH:mm:ss')


//gets all the todos from database
const getAllNotes = async (request, response) => {
    const all = await Todo.find({})

    if (all) {
        response.status(200)
            .json(all)

    } else {
        response.status(404)
            .json({ message: "Todos were not found" });
    }

}

//adds todo
const addNote = async (request, response) => {
    const body = request.body

    const todo = new Todo({
        name: body.name,
        content: body.content,
        begin: time,
        end: body.end,
        completed: false,

    })
    const savedTodo = await todo.save()
    response.json(savedTodo)
}

//gets a certain todo
const getCertainNote = async (request, response) => {
    const todo = await Todo.findById(request.params.id)
    if (todo) response.json(todo)
    else response.status(404).end()
}

//updates note and also if it's ready
const updateNoteContent = async (request, response) => {
    const { name, content, begin, completed } = request.body

    if (name) {
        const newtodo2 = {
            _id: request.params.id,
            name: name,
            content: content,
            begin: begin,
            completed: completed
        }

        const resu = await Todo.findByIdAndUpdate(request.params.id, newtodo2, { new: true })
        console.log('Resu', resu);

        if (resu) {
            response.status(201).json(resu);
        } else {
            response.status(404).end();
        }

    } else {
        const newtodo = {
            "$set": { "completed": true, 'end': time },

        }
        const result = await Todo.findByIdAndUpdate(request.params.id, newtodo, { new: true })
        console.log('Result of completed', result);

        if (result) {
            response.status(201).json(result);
        } else {
            response.status(404).end();
        }
    }
}

//deletes todo
const deleteNote = async (request, response) => {
    const deletedTodo = await Todo.findByIdAndRemove(request.params.id)
    if (deletedTodo) {
        return response.json({ message: "Successfully deleted one note." })
    } else response.status(404).end()
}


module.exports = {
    getAllNotes,
    addNote,
    deleteNote,
    getCertainNote,
    updateNoteContent
}