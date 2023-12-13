class SocketService {
    constructor(io) {
        this.io = io;
        this.sockets = new Set();
    }

    addSocket(socketId) {
        this.sockets.add(socketId);
        this.emitUpdatedSocketList();
    }

    removeSocket(socketId) {
        this.sockets.delete(socketId);
        this.emitUpdatedSocketList();
    }

    emitUpdatedSocketList() {
        this.io.sockets.emit('socketListUpdate', Array.from(this.sockets));
    }
}

module.exports = SocketService;