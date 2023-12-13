import Message from "../models/Message";

class ChatService {
    constructor({}) {
        console.log(`new ChatService`);
    }

    sendMessage(message) {
        console.log(`a message was sent: ${message.message}`)
        io.emit('message-received', message)
    }
}

export default new ChatService({});