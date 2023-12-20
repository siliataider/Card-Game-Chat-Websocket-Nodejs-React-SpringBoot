import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedCards } from '../../slices/gameSlice';
import Card from '../Card/Card';
import { getUserCards } from '../../assets/utility'
import SocketContext from '../../SocketContext';


const CardDeck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCards = useSelector((state) => state.auth.userCards); 
    const selectedCards = useSelector((state) => state.game.selectedCards);
    const currentUserId = useSelector((state) => state.auth.currentUserId);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (currentUserId) {
          getUserCards(dispatch, currentUserId);
        }
    }, [currentUserId, dispatch]);

    const toggleCardSelection = (card) => {
        let updatedSelectedCards;
        if (selectedCards.includes(card)) {
          updatedSelectedCards = selectedCards.filter((c) => c.id !== card.id);
        } else if (selectedCards.length < 5) {
          updatedSelectedCards = [...selectedCards, card];
        }
        console.log("+++++++++++++ updatedSelectedCards ", updatedSelectedCards)
        dispatch(setSelectedCards(updatedSelectedCards));
    };

    const handleStartGame = () => {
        if (socket) {
            const data_to_fight = {
                fromSocketID: data.fromSocketID,
                fromID: data.fromID,
                toSocketID: data.toSocketID,
                toID: currentUserId,
            }
            socket.emit("readyToFight", data)
        }
        //navigate('/arena');
    }

    socket.on('readyToFight', () => {
        console.log("+++++++++++++++++++ readyToFight")
        navigate('/cardDeck');
    });

    return (
        <div>
        <h2>Your Card Deck</h2>
        <div className="card-deck">
            {userCards.map((card) => (
            <div key={card.id} onClick={() => toggleCardSelection(card)}>
                <Card card = {card} showCardDetails = {true} />
                {selectedCards.includes(card) && <p>Selected</p>}
            </div>
            ))}
        </div>
        {selectedCards.length > 0 && (
            <button onClick={() => handleStartGame(selectedCards)}>Start Game</button>
        )}
        </div>
    );
};

export default CardDeck;
