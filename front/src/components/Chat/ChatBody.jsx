import Message from "./Message"
import MessageObject from "./MessageObject";
import React, {useState, useRef, useCallback, useEffect, useContext} from 'react';
import SocketContext from '../../SocketContext';


const ChatBody = () => {
    console.log('chat Body')
    const { socket } = useContext(SocketContext);

    //Messages lists
    const [messageList, setMessageList] = useState([]);

    //Hooks to get the input content while needed
    const inputRef = useRef(null);

    //Socket binding  :
    socket.on('message-received', onNewMessage);

    //Used whene message are recived

    function onNewMessage(value){
        setMessageList(
        <>
            {messageList}
            <Message messageObject={value}></Message>
        </>
            )
    }

    // Used to send message
    function sendMessage(){
        let message = new MessageObject()

        message.senderId = socket.id
        message.message = inputRef.current.value
        message.time = new Date()
        
        socket.emit("message-sent", message)
    }

    return (
        <>
            <h2>Chat :</h2>

            {messageList}

            <input ref={inputRef} ></input>
            <button onClick={sendMessage}>Send</button>
        </>
    )
}

export default ChatBody