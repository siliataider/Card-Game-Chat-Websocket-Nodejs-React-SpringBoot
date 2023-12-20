import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import config from '../../../config';
import SocketContext from '../../SocketContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentSocketID, setcurrentID, setopponentSocketID, setopponentID, setSelectedCards, setopponentCards, setOtherUsers } from '../../slices/gameSlice'
 

const OpponentList = () => {
  //const [connectedUsers, setConnectedUsers] = useState([]);
  const connectedUsers = useSelector((state) => state.game.otherUsers);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const currentUserSocketId = useSelector((state) => state.auth.currentUserSocketId);
  const currentUserId = useSelector((state) => state.auth.currentUserId);
  const dispatch = useDispatch();

  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    if (socket) {
      /*socket.on('startGame', (users) => {
        const otherUsers = users.filter(userId => userId !== socket.id);
        //setConnectedUsers(otherUsers);
        dispatch(setOtherUsers(otherUsers));
      }
      );*/

      socket.on('chatRequest', (data) => {
        console.log(`Receiving a request from: ${data.fromSocketID}`) 
        if (confirm(`Socket ${data.fromSocketID} wants to chat with you 😏 Do you accept?`)) {
            const data_updated = {
              fromSocketID: data.fromSocketID,
              fromID: data.fromID,
              toSocketID: data.toSocketID,
              toID: currentUserId,
            }
            socket.emit('confirmChat', data_updated);
        }
        else{
            console.log("Nah not interested")
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('socketListUpdate');
        socket.off('chatRequest');
      }
    };
  }, [socket]);

  socket.on('startGame', (data) => {
    if (isSender){
      setIsSender(true);
      dispatch(setcurrentSocketID(data.fromSocketID))
      dispatch(setcurrentID(data.fromID))
      dispatch(setopponentSocketID(data.toSocketID))
      dispatch(setopponentID(data.toID))
    }
    else{
      dispatch(setcurrentSocketID(data.toSocketID))
      dispatch(setcurrentID(data.toID))
      dispatch(setopponentSocketID(data.fromSocketID))
      dispatch(setopponentID(data.fromID))
    }
    navigate('/cardDeck');
  });


  const handleSelectOpponent = (userSocketId) => {
    console.log('Selected opponent IDdd:', userSocketId);
    const data = {
      fromSocketID: currentUserSocketId,
      fromID: currentUserId,
      toSocketID: userSocketId,
      toID: null,
    }
    socket.emit('initiateChat', data);
    setIsSender(true);
    //navigate('/cardDeck');
  };

  return (
    <div>
      <h2>Select an Opponent</h2>
      <ul>
        {connectedUsers.map((userId) => (
          <li key={userId}>
            User ID: {userId}
            <button onClick={() => handleSelectOpponent(userId)}>Select</button>
          </li>
        ))}
        </ul>
    </div>
  );
};

export default OpponentList;
