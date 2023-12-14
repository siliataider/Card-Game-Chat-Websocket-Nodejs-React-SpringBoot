import Message from "./Message"

const ChatBody = (props) => {
    console.log('ezbv')


    return (
        <>
            <h2>Chat with : {props.name}</h2>

            <Message></Message>
            <Message></Message>

            <input></input>
            <button>Send</button>
        </>
    )
}

export default ChatBody

