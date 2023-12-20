import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import config from '../../../config';
import SocketContext from '../../SocketContext';
import { useNavigate } from 'react-router-dom';


const OpponentList = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.on('socketListUpdate', (users) => {
        const otherUsers = users.filter(userId => userId !== socket.id);
        setConnectedUsers(otherUsers);
      });
    }

    return () => {
      if (socket) {
        socket.off('socketListUpdate');
      }
    };
  }, [socket]);

  const handleSelectOpponent = (userId) => {
    console.log('Selected opponent IDdd:', userId);
    navigate('/cardDeck');
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
