import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCard } from '../../slices/shopSlice';
import { loadCards } from '../../slices/shopSlice';
import Card from '../Card/Card';
import config from '../../../config';

const Shop = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.shop.cards);
  const currentCard = useSelector((state) => state.shop.currentCard);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const handleCardClick = (card) => {
    dispatch(setCurrentCard(card));
    setShowCardDetails(true);
  };
  useEffect(() => {
    fetchCards();
  }, []);

  const handleBuyClick = async () => {
  
    if (!currentCard.id || !currentUserId) {
      alert('No card selected or user ID not found!');
      return;
    }
  
    const order = {
      user_id: parseInt(currentUserId),
      card_id: parseInt(currentCard.id)
    };
  
    try {
      const response = await fetch(`${config.BASE_URL}/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error('Failed to buy card');
      }
  
      const purchaseSuccess = await response.json();
      if (purchaseSuccess) {
        alert(`Successfully bought card with ID: ${currentCard.id}`);
      } else {
        alert('Failed to buy card. Please try again.');
      }
      setShowCardDetails(false);
      fetchCards();
    } catch (error) {
      console.error('Error during buy card request:', error);
      alert('Failed to buy card');
    }
  };  
  const fetchCards = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/cards_to_sell`);
      if (!response.ok) {
        throw new Error('Failed to fetch cards to sell');
      }
      const cardsData = await response.json();
      dispatch(loadCards(cardsData));
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
  return (
    <div>
      <h2>Card Shop</h2>
      {showCardDetails && currentCard ? (
        <div>
          <h3>Card Details</h3>
          <div className="card-detail-container">
          <Card card = {currentCard} showCardDetails = {showCardDetails}/>
          <button onClick={handleBuyClick}>Buy</button>
          <br></br>
          </div>
        </div>
      ) : (
        <div className="card-container">
          {cards.map((card) => (
            <div className="card" key={card.id} onClick={() => handleCardClick(card)}>
              <Card card = {card} showCardDetails = {showCardDetails}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;