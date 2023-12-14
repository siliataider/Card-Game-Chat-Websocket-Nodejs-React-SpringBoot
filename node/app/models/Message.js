export default class Message {
    constructor({senderId, receiverId, time, message}) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.time = time;
        this.message = message;
    }
}