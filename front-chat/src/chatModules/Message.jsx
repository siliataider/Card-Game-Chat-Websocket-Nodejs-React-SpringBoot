const Message = (props) => {

    console.log("ERGKHJN")
    return (
        <>
            <p>From : {props.messageObject.senderId}</p>
            <p>{props.messageObject.message}</p>
            <p>{props.messageObject.time}</p>

        </>
    )
}

export default Message