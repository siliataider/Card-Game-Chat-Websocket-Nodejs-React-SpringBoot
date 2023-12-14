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
                this.socketService.sendChatRequest(data);
            });

            socket.on('confirmChat', (data) => {
                this.socketService.startGame(data)
            });
            
        });
    }
}

module.exports = SocketController;