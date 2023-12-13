const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8084
const server = app.listen(PORT, () => console.log(`Hello j'ai démarré sur le port ${PORT}`))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))

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