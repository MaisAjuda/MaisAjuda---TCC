const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Router = require('./routes'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: process.env.CORS_ORIGIN || "http://localhost:5173" } });

app.use(express.json());

app.use(Router);

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');
    

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const port = process.env.PORT || 3344;
server.listen(port, () => {
    console.log(`Servidor Ligado na porta ${port}`);
});
