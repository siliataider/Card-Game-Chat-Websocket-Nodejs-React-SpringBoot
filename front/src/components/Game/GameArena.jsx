import React from 'react';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../config';
import { useState, useEffect, useContext  } from 'react';
import ChatBody from '../Chat/ChatBody'
import { setSelectedCards, setopponentCards } from '../../slices/gameSlice';

import SocketContext from '../../SocketContext';



const GameArena = () => {
    const dispatch = useDispatch();

    const { socket } = useContext(SocketContext);

    const [actionPointPlayer, setActionPointPlayer] = useState([]);
    const [cardSelected, setSelectedCard] = useState(null);
    //const [cardListOpponent, setOpponentBoard] = useState([]);
    const opponentID = useSelector((state) => state.game.opponentID);
    const currentID = useSelector((state) => state.game.currentID);
    const cardListPlayer = useSelector((state) => state.game.selectedCards);
    const cardListOpponent = useSelector((state) => state.game.opponentCards);


    useEffect(() => {
        socket.on('load-board', (data) => {
            console.log(data)
            console.log("load terrain")
            dispatch(setSelectedCards(data[currentID].cardsList))
            dispatch(setopponentCards(data[opponentID].cardsList))
    
          });
        return () => {
            if (socket) {
              socket.off('load-board');
            }
          };
    }, [cardListPlayer]);

    const selectionAttackCard = (card) => {
        console.log("carte d'attaque")
        socket.emit('select-my-card', card, currentID)
        setSelectedCard(card)
    }
    const selectionAttackTarget = (card) => {
        
        let data = {
            userId: currentID,
            card: cardSelected,
            cardOpponent: card
        }
        console.log(data)
        socket.emit('select-opponent-card', data)
    }
    return (
        <div className='d-flex'>
            <div className="col-5">
                <div className="four wide column">
                    <ChatBody></ChatBody>
                </div>
            </div>
            <div className="col-7">
                <div className="row bg-primary">
                    <div className="ui grid">
                        <div className="two wide column">
                            {/*actionPointPlayer*/}
                        </div>
                        <div className="ten wide column">
                            <div className="ui four column grid">
                            {/* Replace with your ShortCard React components */}
                            {cardListOpponent.map((card) => (
                                <div key={card.id} onClick={() => selectionAttackTarget(card)}>
                                    <Card key={card.id} card={card} showCardDetails={true} />
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className="four wide column">
                            { /*<Card /> Replace with your FullCard React component for player 1 */}
                            
                        </div>
                    </div>
                </div>
                <div className="row bg-secondary">
                    <div className="ui grid">
                    <div className="two wide column">
                        {/* User info and action points for player 2 */}
                    </div>
                    <div className="ten wide column">
                        <div className="ui four column grid">
                            {/* Replace with your ShortCard React components */}
                            {cardListPlayer.map((card) => (
                                <div key={card.id} onClick={() => selectionAttackCard(card)}>
                                    <Card key={card.id} card={card} showCardDetails={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="four wide column">
                        {/*<Card />  Replace with your FullCard React component for player 2 */}
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameArena;
