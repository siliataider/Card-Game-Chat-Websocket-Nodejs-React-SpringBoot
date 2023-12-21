import React from 'react';
import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import config from '../../../config';
import { setUserCards } from '../../slices/authSlice';
import { getUserCards } from '../../assets/utility'

const Inventory = () => {
  const dispatch = useDispatch();
  const userCards = useSelector((state) => state.auth.userCards); 
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  /*const getUserCards = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/user/${currentUserId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user infos');
      }
      const userInfo = await response.json();
      
      let listUserCards = []
      for (let cardId of userInfo.cardList) {
        let cardInfo = await getCards(cardId)
        if (cardInfo) {
          listUserCards.push(cardInfo);
        }
      }
     
      dispatch(setUserCards(listUserCards));
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données GET:', error);
    }
  };*/

  useEffect(() => {
    if (currentUserId) {
      getUserCards(dispatch, currentUserId);
    }
  }, [currentUserId, dispatch]);
  
  /*const getCards = async (cardId) => {
    try {
      const response = await fetch(`${config.BASE_URL}/card/${cardId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch card info');
      }
      const cardInfo = await response.json();
      return cardInfo;

    } catch (error) {
      console.error('Erreur lors de la récupération des données GET:', error);
    }
  };*/


  const handleSellClick = async (currentCard) => {
    if (!currentCard.id || !currentUserId) {
      alert('No card selected or user ID not found!');
      return;
    }
  
    const order = {
      user_id: parseInt(currentUserId),
      card_id: parseInt(currentCard.id)
    };
  
    try {
      const response = await fetch(`${config.BASE_URL}/sell`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error('Failed to sell card');
      }
  
      const purchaseSuccess = await response.json();
      if (purchaseSuccess) {
        await getUserCards(dispatch, currentUserId)
        alert(`Successfully sell with ID: ${currentCard.id}`);
      } else {
        alert('Failed to sell card. Please try again.');
      }
  
    } catch (error) {
      console.error('Error during sell card request:', error);
      alert('Failed to sell card');
    }
  };  

  return (
    <div>
      <h2>Inventory</h2>
      {userCards.map((card) => (
        <div key={card.id}>
          <Card card = {card} showCardDetails = {true} />
          <button className='btn btn-info pb-1' onClick={() => handleSellClick(card)} >Sell</button>
        </div>
      ))}
    </div>
  );
};

export default Inventory;