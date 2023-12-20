import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCards } from '../../slices/gameSlice';
import Card from '../Card/Card';
import { getUserCards } from '../../assets/utility'



const CardDeck = ({ onStartGame }) => {
    const dispatch = useDispatch();
    const userCards = useSelector((state) => state.auth.userCards); 
    const selectedCards = useSelector((state) => state.game.selectedCards);
    const currentUserId = useSelector((state) => state.auth.currentUserId);

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
        dispatch(setSelectedCards(updatedSelectedCards));
    };

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
            <button onClick={() => onStartGame(selectedCards)}>Start Game</button>
        )}
        </div>
    );
};

export default CardDeck;
