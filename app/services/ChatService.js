import Message from "../models/Message";

class ChatService {
    constructor(io) {
        this.io = io;
        console.log(`new ChatService`);
    }

    sendMessage(message) {
        console.log(`a message was sent: ${message.message}`)
        io.to(message.receiverId).emit('message-received', message.message)
    }
}

export default ChatService;