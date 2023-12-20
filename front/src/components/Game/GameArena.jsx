import React from 'react';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../config';
import { useState, useEffect  } from 'react';


const GameArena = () => {

    const currentUserId = useSelector((state) => state.auth.currentUserId);
    const selectedCards = useSelector((state) => state.game.selectedCards);

    return (
        <div className="ui segment">
        <div className="ui grid">
            <div className="four wide column">
            {/* <ChatContent />  */}
            
            </div>
            <div className="twelve wide column">
            <div className="row">
                <div className="ui grid">
                <div className="two wide column">
                    {/* User info and action points for player 1 */}
                </div>
                <div className="ten wide column">
                    <div className="ui four column grid">
                    {/* Replace with your ShortCard React components */}
                    {selectedCards.map((card) => (
                        <Card key={card.id} card={card} showCardDetails={true} />
                    ))}
                    </div>
                </div>
                <div className="four wide column">
                    {/* Replace with your FullCard React component for player 1 */}
                    <Card />
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
                    {/* Replace with your ShortCard React components */}
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="column">
                        <Card />
                        </div>
                    ))}
                    </div>
                </div>
                <div className="four wide column">
                    {/* Replace with your FullCard React component for player 2 */}
                    <Card />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default GameArena;
