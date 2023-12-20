const SocketService = require('../services/socketService');
const ChatService = require('../services/ChatService');
const UserService = require('../services/UserService');
const CombatService = require('../services/CombatService');

class SocketController {
    constructor(io) {
        this.io = io;
        this.socketService = new SocketService(this.io);
        this.chatService = new ChatService(this.io);
        this.userService = new UserService();
        this.combatService = new CombatService();
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.io.on('connection', (socket) => {
            this.socketService.addSocket(socket.id);
            this.userService.getAllUsers();
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
            socket.on('end-turn', (data) => {
                this.combatService.endTurn(data);
            })
            socket.on('select-my-card', (data) => {
                this.combatService.isCardValid(data);
            })
            socket.on('select-opponent-card', (data) => {
                this.combatService.combat(data);
            })
            
        });
    }
}

module.exports = SocketController;