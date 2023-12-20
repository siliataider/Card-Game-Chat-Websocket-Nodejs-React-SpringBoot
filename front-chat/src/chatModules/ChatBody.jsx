import Message from "./Message"
import MessageObject from "./MessageObject";
import React, {useState, useRef, useCallback, useEffect} from 'react';

const ChatBody = (props) => {
    console.log('chat Body')

    //Messages lists
    const [messageList, setMessageList] = useState([]);

    //Hooks to get the input content while needed
    const inputRef = useRef(null);

    //Socket binding  :
    props.socket.on('message-received', onNewMessage);

    //Used whene message are recived

    function onNewMessage(value){
        console.log("+++")
        setMessageList(
        <>
            {messageList}
            <Message messageObject={value}></Message>
        </>
            )
    }

    // Used to send message
    function sendMessage(){
        console.log("erg")
        let message = new MessageObject()

        console.log("jvg")

        message.senderId = props.socket.id
        message.message = inputRef.current.value
        message.time = new Date()
        console.log(message)

        props.socket.emit("message-sent", message)
    }

    return (
        <>
            <h2>Chat with : {props.name}</h2>

            {messageList}

            <input ref={inputRef} ></input>
            <button onClick={sendMessage}>Send</button>
        </>
    )
}

export default ChatBody