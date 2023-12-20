const SocketService = require('../services/socketService');
const ChatService = require('../services/ChatService')

class SocketController {
    constructor(io) {
        this.io = io;
        this.socketService = new SocketService(this.io);
        this.chatService = new ChatService(this.io);
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
                this.socketService.startGame(data);
            });

            socket.on('message-sent', (data) => {
                console.log("i notified the chat service");
                this.chatService.sendMessage(data);
            })
            
        });
    }
}

module.exports = SocketController;