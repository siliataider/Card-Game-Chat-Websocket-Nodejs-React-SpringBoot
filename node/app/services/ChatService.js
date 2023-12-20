class ChatService {
    constructor(io) {
        this.io = io;
        console.log("i init the chat service");
    }

    sendMessage(data) {
        console.log(`a message was sent: ${data.message}`)
        this.io.to(data.receiverId).emit('message-received', data)
        this.io.emit('message-received', data)
    }
}

module.exports = ChatService;