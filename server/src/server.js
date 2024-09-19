const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Router = require('./routes'); // Certifique-se de que o caminho está correto

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: process.env.CORS_ORIGIN || "http://localhost:5173" } });

// Middleware para analisar JSON
app.use(express.json());

// Definição de rotas
app.use(Router);

// Configuração de eventos para Socket.IO
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');
    
    // Lidar com eventos de socket aqui

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

const port = process.env.PORT || 3344;
server.listen(port, () => {
    console.log(`Servidor Ligado na porta ${port}`);
});
