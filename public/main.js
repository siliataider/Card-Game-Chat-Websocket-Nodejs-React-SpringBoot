const socket = io()
console.log(socket)

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