import React from 'react';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../config';
import { useState, useEffect  } from 'react';
import {ChatBody} from '../Chat/ChatBody'

import SocketContext from '../../SocketContext';



const GameArena = () => {

    const { socket } = useContext(SocketContext);

    const [actionPointPlayer, setActionPointPlayer] = useState([]);
    const [cardListPlayer, setPlayerBoard] = useState([]);
    const [cardListOpponent, setOpponentBoard] = useState([]);

    socket.on("GETBOARD", refreshBoard )

    function refreshBoard(value){
        setActionPointPlayer( 10 )

        // Todo : get player card in value

        setPlayerBoard(

        )

        setOpponentBoard(
            
        )
    }

    socket.on("YOURTURN", refreshBoard )
    

    const currentUserId = useSelector((state) => state.auth.currentUserId);
    const selectedCards = useSelector((state) => state.game.selectedCards);

    return (
        <div className="ui segment">
        <div className="ui grid">
            <div className="four wide column">
            {/* <ChatContent />  */}
            <ChatBody></ChatBody>
            
            </div>
            <div className="twelve wide column">
            <div className="row">
                <div className="ui grid">
                <div className="two wide column">
                    {actionPointPlayer}
                </div>
                <div className="ten wide column">
                    <div className="ui four column grid">

                    {cardListPlayer}
                    {/* Replace with your ShortCard React components */}
                    {/*selectedCards.map((card) => (
                        <Card key={card.id} card={card} showCardDetails={true} />
                    ))*/}
                    </div>
                </div>
                <div className="four wide column">
                    { /*<Card /> Replace with your FullCard React component for player 1 */}
                    
                </div>
                </div>
            </div>
            <div className="row">
                {/* VS Divider and Attack Button */}
            </div>
            <div className="row">
                <div className="ui grid">
                <div className="two wide column">
                    {/* User info and action points for player 2 */}
                </div>
                <div className="ten wide column">
                    <div className="ui four column grid">
                        {cardListOpponent}
                    {/* Replace with your ShortCard React components */}
                    {/*[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="column">
                        <Card />
                        </div>
                    ))*/}
                    </div>
                </div>
                <div className="four wide column">
                    {/*<Card />  Replace with your FullCard React component for player 2 */}
                    
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default GameArena;
