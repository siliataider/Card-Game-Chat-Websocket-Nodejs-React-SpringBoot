const express = require('express')
const path = require('path')
const SocketController = require('./app/managers/socketController');

const app = express()
const PORT = process.env.PORT || 8084
const server = app.listen(PORT, () => console.log(`Hello j'ai démarré sur le port ${PORT}`))

const io = require('socket.io')(server)
const socketController = new SocketController(io);

app.use(express.static(path.join(__dirname,'public')))

/*
app.get('/get-sockets', (req, res) => {
    const sockets = [1, 2, 3, 4, 5];
    res.json(sockets);
});
*/

/*
let socketsConnected = new Set()
io.on('connection', onConnected)
function onConnected(socket){
    console.log(`Socket connecté: ${socket.id}`)
    socketsConnected.add(socket)
    io.emit('connected-total', socketsConnected.size)
    socket.on('message-sent', (data) => {
        console.log(`a message was sent: ${data.message}`)
        io.emit('message-received', data)
    })
    socket.on('disconnect', () => {
        console.log(`Socket déconnecté: ${socket.id}`)
        socketsConnected.delete(socket)
        io.emit('connected-total', socketsConnected.size)
    })
}
*/