const SocketService = require('../services/socketService');
const ChatService = require('../services/ChatService');
const CombatService = require('../services/CombatService');
const UserService = require('../services/UserService');

class SocketController {
    constructor(io) {
        this.io = io;
        this.socketService = new SocketService(this.io);
        this.chatService = new ChatService(this.io);
        this.combatService = new CombatService();
        this.userService = new UserService().getInstance();
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.io.on('connection', (socket) => {
            console.log("+++++++++connected")
            this.socketService.addSocket(socket.id);
            this.userService.getAllUsers();
            
            socket.on('disconnect', () => {
                this.socketService.removeSocket(socket.id);
                console.log("+++++++++++isconnected")
            });

            socket.on('initiateChat', (data) => {
                console.log("+++++++++++++++++++++++ chat initiated")
                console.log(data)
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

            socket.on('getotherUsers', ()  => {
                console.log("+++++++++++++++++++getotherUsers")
                this.socketService.emitUpdatedSocketList();
            })

            socket.on('readyToFight?', (data)  => {
                console.log("emitFightRequest", data)
                this.socketService.emitFightRequest(data);
            })

            socket.on('letsGo', (data) => {
                this.socketService.emitLetsGo(data);
            })
            
        });
    }
}

module.exports = SocketController;