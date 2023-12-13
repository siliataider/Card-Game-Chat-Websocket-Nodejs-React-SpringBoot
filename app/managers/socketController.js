const SocketService = require('./socketService');

class SocketController {
    constructor(io) {
        this.io = io;
        this.socketService = new SocketService();
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.io.on('connection', (socket) => {
            this.socketService.addSocket(socket);

            socket.on('disconnect', () => {
                this.socketService.removeSocket(socket);
            });
        });
    }

    getAllSockets() {
        return this.socketService.getAllSockets();
    }

    getAllSockets_test() {
        return this.socketService.getAllSockets_test();
    }
}

module.exports = SocketController;