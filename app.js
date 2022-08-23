
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const noterouter = require('./routes/noterouter')
const path = require('path')

const middleware = require('./utils/middleware')


// mongo here...

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

// this allows connection from different domains and ports
app.use(cors())


// convert json string to json object (from request)
app.use(express.json())

app.use(express.static('build'))



app.use('/api/todos', noterouter)

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./build/index.html")
    );
})

app.use(middleware.requestLogger)

module.exports = app;






