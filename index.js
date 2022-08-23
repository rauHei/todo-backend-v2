const http = require('http')
const config = require('./utils/config')

const app = require('./app');

const server = http.createServer(app)

// app listen port 3001
server.listen(config.PORT, () => {
    console.log(`Todo app listening on port ${config.PORT}`)
})