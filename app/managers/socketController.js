const SocketService = require('./socketService');

class SocketController {
    constructor(io) {
        this.io = io;
        this.socketService = new SocketService(this.io);
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.io.on('connection', (socket) => {
            this.socketService.addSocket(socket.id);

            socket.on('disconnect', () => {
                this.socketService.removeSocket(socket.id);
            });

            socket.on('initiateChat', (data) => {
                this.io.to(data.to).emit('chatRequest', data);
            });

            socket.on('confirmChat', (data) => {
                this.io.to(data.from).emit('gameStart');
                this.io.to(data.to).emit('gameStart');
            });
            
        });
    }
}

module.exports = SocketController;