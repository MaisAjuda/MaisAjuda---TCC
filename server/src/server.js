const app = require('express')()
const server = require('http')
const Router = require('./routes')
const io = require('socket.io')(server, {cors:{origin: process.env.PORT || "http://localhost:5173" }})

app.use(Router)

app.listen(process.env.PORT || 3344, console.log("Servidor Ligado"))