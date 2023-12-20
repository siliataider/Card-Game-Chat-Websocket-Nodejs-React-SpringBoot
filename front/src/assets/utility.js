import config from '../../config';
import { setUserCards } from '../../src/slices/authSlice'

export const getUserCards = async (dispatch, currentUserId) => {
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
};


export const getCards = async (cardId) => {
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
};

