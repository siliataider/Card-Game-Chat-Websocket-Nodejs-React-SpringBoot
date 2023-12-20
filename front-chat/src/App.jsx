import './context/init'

import ChatBody from './chatModules/ChatBody'
import RoomBody from './roomModules/RoomBody';

import { io } from "socket.io-client";


function App() {

  const socket = io()
  
  return (
      <ChatBody socket = {socket} ></ChatBody>

  )
}

export default App
