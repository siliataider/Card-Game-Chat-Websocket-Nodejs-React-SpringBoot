import { useState, useEffect, useMemo  } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import FormDisplay from './pages/FormDisplay'
import InventoryDisplay from './pages/InventoryDisplay'
import ShopDisplay from './pages/ShopDisplay'

import { loadCards } from './slices/shopSlice';
import { logout } from './slices/authSlice';
import './App.css'
import config from '../config';
import { BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import {io} from 'socket.io-client';
import SocketContext from './SocketContext';
import OpponentSelectionDisplay from './pages/OpponentSelectionDisplay'
import CardDeck from './components/CardDeck/CardDeck';


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

  /*useEffect(() => {
      const socket = io()
}, []);*/

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

const socketProviderValue = useMemo(() => ({ socket }), [socket]);


 const verifyLogin = () => {
    console.log(isLoggedIn);

    if(isLoggedIn){
        return <InventoryDisplay/>;
    }
    return <FormDisplay/>;
 }

 const handleGoBack = () => {
     setShowLogin(false);
     setShowSignup(false);
     setShowButtons(true);
     dispatch(logout());
   };

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
    setGameOn(true);
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
                  </Routes>
                </div>
          </BrowserRouter>
    </SocketContext.Provider>
  )
}


{/*
          <div className="main">
           {showButtons && (
           <>
            <div>
              <button onClick={handleSignupClick}>Sign up</button>
            </div>
            <br></br>
            <div>
              <button onClick={handleLoginClick}>Log in</button>
            </div>
            </>
            )}

          {showLogin && (
            <div>
              <LoginForm/>
              <br></br>
              <button onClick={handleGoBack}>Go Back</button>
            </div>
          )}

          {showSignup && (
            <div>
              <SignupForm/>
              <br></br>
              <button onClick={handleGoBack}>Go Back</button>
            </div>
          )}

          {isLoggedIn && (
            <div>
              { loadShopOrInv
                ? <Inventory />
                : <Shop />
              }
              <br></br>
              <button onClick={handleGoBack}>Log out</button>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <>
            <div>
              { loadShopOrInv
                ? <button onClick={handleLoadInventory}>Shop</button>
                : <button onClick={handleLoadInventory}>Inventory</button>
              }


            </div>
          )}

            <div>
              <button onClick={handleStartGame}>Start Game!</button>
            </div>
          </>
        )}
        {gameOn && (
          <>
          <div>
            <GameArena></GameArena>
          </div>
          <div>
            <button onClick={handleEndGame}>End Game!</button>
          </div>
        </>
        )}
    </>
  )
} */}

export default App;
