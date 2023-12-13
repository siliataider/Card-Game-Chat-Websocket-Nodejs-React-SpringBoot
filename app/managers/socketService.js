class SocketService {
    constructor() {
        this.sockets = new Set();
    }

    addSocket(socket) {
        this.sockets.add(socket);
        console.log(`Socket connecté: ${socket.id}`);
        console.log(`Total connectés: ${this.sockets.size}`);
    }

    removeSocket(socket) {
        this.sockets.delete(socket);
        console.log(`Socket déconnecté: ${socket.id}`);
    }

    getAllSockets() {
        return Array.from(this.sockets);
    }

    getAllSockets_test() {
        return [0, 1, 2, 3, 4, 5];
    }
}

module.exports = SocketService;
