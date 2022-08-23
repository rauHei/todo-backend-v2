const http = require('http')
const config = require('./utils/config')

const index = require('./index');

const server = http.createServer(index)

// app listen port 3001
server.listen(config.PORT, () => {
    console.log(`Todo app listening on port ${config.PORT}`)
})