import './context/init'

import ChatBody from './chatModules/ChatBody'
import RoomBody from './roomModules/RoomBody';

import { io } from "socket.io-client";


function App() {
  
  return (
      <RoomBody></RoomBody>

  )
}

export default App
