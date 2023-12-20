const UserService = require('../services/UserService');


class SocketService {
    constructor(io) {
        this.io = io;
        this.sockets = new Set();
        this.userService = new UserService().getInstance();
    }

    async addSocket(socketId, userId) {
        //let user = await this.userService.getUser(userId);
        this.sockets.add(socketId);
        this.emitUpdatedSocketList();
    }

    removeSocket(socketId, userId) {
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