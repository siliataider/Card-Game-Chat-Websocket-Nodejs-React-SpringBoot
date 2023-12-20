const Friend = (props) => {
    const url = "chat.html?socketId="+ props.id
    return (
        <>
            <a href={url} >Socket : {props.id}</a>
        </>
    )
}

export default Friend

            