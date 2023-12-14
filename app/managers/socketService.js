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

    sendChatRequest(data){
        this.io.to(data.to).emit('chatRequest', data);
    }

    startGame(data){
        this.io.to(data.from).emit('startGame');
        this.io.to(data.to).emit('startGame');
    }
}

module.exports = SocketService;