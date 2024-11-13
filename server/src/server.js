const express = require('express');
const http = require('http');
const db = require('./database');
const socketIo = require('socket.io');
const Router = require('./routes'); 
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
    cors: { 
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    } 
});

app.use(cors());

app.use(express.json());
app.use('/files', express.static("uploads"))
app.use(express.urlencoded({ extended: true }));

app.use(Router);

const socketStore = {
    currentSocket: null
};

io.on('connection', (socket) => {
    console.log('👤 Novo cliente conectado');
    socketStore.currentSocket = socket;

    socket.on('disconnect', () => {
        console.log('👋 Cliente desconectado');
        if (socketStore.currentSocket === socket) {
            socketStore.currentSocket = null;
        }
    });

    socket.on('error', (error) => {
        console.error('❌ Erro no socket:', error);
    });
});

function socketNotify(notify) {
    if (socketStore.currentSocket) {
        socketStore.currentSocket.emit('notify', notify);
    }
}

const port = process.env.PORT || 3344;
server.listen(port, () => {
    console.log(`Servidor Ligado na porta ${port}`);
    db();
});

