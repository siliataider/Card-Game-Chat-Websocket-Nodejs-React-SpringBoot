class SocketService {
    constructor(io) {
        this.io = io;
        this.sockets = new Set();
    }

    addSocket(socketId) {
        this.sockets.add(socketId);
        this.emitUpdatedSocketList();
        console.log("addsocket")
    }

    removeSocket(socketId) {
        this.sockets.delete(socketId);
        this.emitUpdatedSocketList();
    }

    emitUpdatedSocketList() {
        this.io.sockets.emit('socketListUpdate', Array.from(this.sockets));
        console.log("+++++++++++++ emitted: ", Array.from(this.sockets))
    }

    sendChatRequest(data){
        this.io.to(data.toSocketID).emit('chatRequest', data);
        console.log("++++++++++++++++++sending chat request to ", data.toSocketID)
    }

    startGame(data){
        this.io.to(data.fromSocketID).emit('startGame');
        this.io.to(data.toSocketID).emit('startGame');
    }
}

module.exports = SocketService;