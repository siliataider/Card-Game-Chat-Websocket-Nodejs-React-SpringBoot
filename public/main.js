const socket = io()
console.log(socket)

let opponentSocketId = null;
const listElement = document.getElementById('socketList');
const chatElement = document.getElementById('elem2');

socket.on('socketListUpdate', (sockets) => {
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

    const connectedTotal = document.getElementById('connected-total')
    connectedTotal.innerHTML = `Participants: ${sockets.length}`;
});

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

socket.on('startGame', () => {
    listElement.hidden = true;
    chatElement.hidden = false;
    //window.location.href = 'chat.html';
});

if (document.getElementById('message-container')){
    const messageContainer = document.getElementById('message-container');
    const messageForm = document.getElementById('message-form')
    const messageInput = document.getElementById('message-input')

    messageForm.addEventListener('submit', (e) =>{
        console.log("i clicked the send button");
        e.preventDefault()
        data = {
            senderId: socket.id,
            receiverId: opponentSocketId,
            time: new Date().toLocaleString(),
            message: messageInput.value,
        }
        console.log(data);
        socket.emit('message-sent', data);
        printMessage(data);
        messageInput.value = '';
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
                        <p class="">
                            ${data.time}
                        </p>
                    </li>`
    
        messageContainer.innerHTML += element
    }
}

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