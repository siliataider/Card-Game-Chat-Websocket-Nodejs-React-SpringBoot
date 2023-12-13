const socket = io()
console.log(socket)

let opponentSocketId = null;

socket.on('socketListUpdate', (sockets) => {
    
    if (document.getElementById('socketList')) {
        const listElement = document.getElementById('socketList');
        listElement.innerHTML = '';
        
        sockets.forEach(socketId => {
            if (socketId !== socket.id) { 
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `chat.html?socketId=${socketId}`;
                link.textContent = `Socket ${socketId}`;
                listItem.appendChild(link);
                listElement.appendChild(listItem);
            }
        });
    }
});

if (document.getElementById('socketList')) {
    document.getElementById('socketList').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const href_ = event.target.href;
            const url = new URL(href_);
            opponentSocketId = url.searchParams.get('socketId');
            console.log(`Sending a request to: ${opponentSocketId}`)

            data = {
                from: socket.id,
                to: opponentSocketId
            }
            socket.emit('initiateChat', data);
        }
    });
}

socket.on('chatRequest', (data) => {
    console.log(`Receiving a request from: ${data.from}`) 
    if (confirm(`Socket ${data.from} wants to chat with you 😏 Do you accept?`)) {
        opponentSocketId = data.from;
        socket.emit('confirmChat', {
            from: opponentSocketId,
            to: socket.id
        });
    }
    else{
        console.log("Nah not interested")
    }
});

socket.on('gameStart', () => {
    window.location.href = 'chat.html';
});




/*
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const connectedTotal = document.getElementById('connected-total')

messageForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    data = {
        message: messageInput.value,
        sender: 'silia'
    }
    socket.emit('message-sent', data)
})

socket.on('message-received', (data) => {
    printMessage(data)
})

socket.on('connected-total', (data) => {
    connectedTotal.innerHTML = `Participants: ${data}`
})

function printMessage(data){
    element = ` <li>
                    <p class="message">
                        ${data.message}
                    </p>
                </li>`

    messageContainer.innerHTML += element
}
*/