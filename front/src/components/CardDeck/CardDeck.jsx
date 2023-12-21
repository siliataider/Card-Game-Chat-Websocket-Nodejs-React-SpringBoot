import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedCards, setopponentCards } from '../../slices/gameSlice';
import Card from '../Card/Card';
import { getUserCards } from '../../assets/utility'
import SocketContext from '../../SocketContext';


const CardDeck = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCards = useSelector((state) => state.auth.userCards); 
    const currentUserId = useSelector((state) => state.auth.currentUserId);
    const { socket } = useContext(SocketContext);

    const currentSocketID = useSelector((state) => state.game.currentSocketID);
    const currentID = useSelector((state) => state.game.currentID);
    const opponentSocketID = useSelector((state) => state.game.opponentSocketID);
    const opponentID = useSelector((state) => state.game.opponentID);
    const selectedCards = useSelector((state) => state.game.selectedCards);
    const opponentCards = useSelector((state) => state.game.opponentCards);

    const [isSender, setIsSender] = useState(false);

    
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
                fromSocketID: currentSocketID,
                fromID: currentID,
                toSocketID: opponentSocketID,
                toID: opponentID,
                fromCards: selectedCards,
                toCards: opponentCards
            }
            console.log("+++++++ data_to_fight ", data_to_fight)
            socket.emit("readyToFight?", data_to_fight)
            setIsSender(true);
        }
        //navigate('/arena');
    }

    useEffect(() => {        
        if (socket) {
          socket.on('readyToFight??', (data) => {     
            console.log("+++++++++++++++++++ readyToFight?? here are my cards ", selectedCards) 
            if (confirm('READY TO FIGHT?')) {
                const data_to_fight = {
                    fromSocketID: data.fromSocketID,
                    fromID: data.fromID,
                    toSocketID: data.toSocketID,
                    toID: data.toID,
                    fromCards: data.fromCards,
                    toCards: selectedCards
                }
                dispatch(setopponentCards(data.fromCards));
                console.log("EMIT LETSGO", data_to_fight)
                socket.emit('letsGo', data_to_fight);
            }
            else{
                console.log("Nah not interested")
            }
          });

          socket.on('toArena', (data) => {
            console.log("+++++++++++++++++++ on toArena ", data)
            if (isSender){
                dispatch(setopponentCards(data.toCards));
                setIsSender(false);
            }
            socket.emit('set-combat-data', data)
            navigate('/arena');
        });
        }
    
        return () => {
          if (socket) {
            socket.off('readyToFight??');
            socket.off('toArena');
          }
        };
    }, [socket, selectedCards]);

    /*socket.on('readyToFight??', (data) => {
        console.log("+++++++++++++++++++ readyToFight??")
        if (confirm(`READY TO FIGHT?`)) {
            const data_to_fight = {
                fromSocketID: data.fromSocketID,
                fromID: data.fromID,
                toSocketID: data.toSocketID,
                toID: data.toID,
                fromCards: data.fromCards,
                toCards: selectedCards
            }
            dispatch(setopponentCards(data.selectedCards));
            socket.emit("letsGo", data_to_fight)
        }
        else{
            console.log("Nah not yet")
        }


    });
    
    socket.on('toArena', (data) => {
        console.log("+++++++++++++++++++ toArena")
        if (isSender){
            dispatch(setopponentCards(data.toCards));
            setIsSender(false);
        }
        //navigate('/cardDeck');
    });
    */
    

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
