const socket = io()
console.log(socket)


fetch('/get-sockets')
    .then(response => response.json())
    .then(sockets => {
        const listElement = document.getElementById('socketList');
        sockets.forEach(socketId => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `chat.html?socketId=${socketId}`;
            link.textContent = `Socket ${socketId}`;
            listItem.appendChild(link);
            listElement.appendChild(listItem);
        });
    });


document.getElementById('socketList').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        window.location.href = event.target.href;
        const urlParams = new URLSearchParams(window.location.search);
        const opponentSocketId = urlParams.get('socketId');
        console.log(`I chose the user with the id: ${opponentSocketId}`)
    }
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