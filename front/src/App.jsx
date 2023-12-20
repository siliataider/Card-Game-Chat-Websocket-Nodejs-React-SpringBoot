import { useState, useEffect, useMemo  } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import HubDisplay from './pages/HubDisplay'
import FormDisplay from './pages/FormDisplay'
import InventoryDisplay from './pages/InventoryDisplay'
import ShopDisplay from './pages/ShopDisplay'
import { loadCards } from './slices/shopSlice';
import { setCurrentUserSockerId } from './slices/authSlice';
import './App.css'
import config from '../config';
import { BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import {io} from 'socket.io-client';
import SocketContext from './SocketContext';
import OpponentSelectionDisplay from './pages/OpponentSelectionDisplay'
import CardDeck from './components/CardDeck/CardDeck';
import { setOtherUsers } from './slices/gameSlice'
import GameArena from './components/Game/GameArena'

function App() {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cards = useSelector((state) => state.shop.cards);
  const [loadShopOrInv, setShopOrInv] = useState(false);
  const [gameOn, setgameOn] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const userCards = useSelector((state) => state.auth.userCards);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const newSocket = io();
  
      newSocket.on('connect', () => {
        console.log('Connected with socket ID:', newSocket.id);
        dispatch(setCurrentUserSockerId(newSocket.id));
        newSocket.emit('getotherUsers');

        newSocket.on('socketListUpdate', (users) => {
          const otherUsers = users.filter(userId => userId !== newSocket.id);
          dispatch(setOtherUsers(otherUsers));
        });

      });
  
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [isLoggedIn]);
  


  const socketProviderValue = useMemo(() => ({ socket }), [socket]);


 const verifyLogin = () => {
    if(isLoggedIn){
        return <HubDisplay/>;
    }
    return <FormDisplay/>;
 }

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowButtons(false);
    // dispatch(loadCards(jsonSource.default));
    fetchCards();
  };

  const handleLoadInventory = () => {
    setShopOrInv(!loadShopOrInv);
    fetchCards();
  };

  const handleStartGame = () => {
    if (selectedCards.length === 0) {
      alert("Please select cards for the game");
      return;
    }
    dispatch(setSelectedCards(selectedCards));
    setgameOn(true);
  };


  const handleEndGame = () => {
    setgameOn(false);
  }

  const handleCardSelect = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 5) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleLoginSuccess();
    }
  }, [isLoggedIn]);

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
    <SocketContext.Provider value={socketProviderValue}>
          <BrowserRouter>
                <div>
                  <Routes>
                      <Route path='/' element={verifyLogin()} />
                      <Route path='/signup' element={<FormDisplay/>} />
                      <Route path='/shop' element={<ShopDisplay/>} />
                      <Route path='/login' element={<FormDisplay/>} />
                      <Route path='/inventory' element={<InventoryDisplay/>} />
                      <Route path='/opponents' element={<OpponentSelectionDisplay/>} />
                      <Route path='/cardDeck' element={<CardDeck/>} />
                      <Route path='/arena' element={<GameArena/>} />
                  </Routes>
                </div>
          </BrowserRouter>          
    </SocketContext.Provider>
  )
}


export default App;
