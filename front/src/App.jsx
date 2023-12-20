import { useState, useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Shop from './components/Shop/Shop'
import Inventory from './components/Inventory/Inventory'
import Card from './components/Card/Card'
import FormDisplay from './pages/FormDisplay'
import InventoryDisplay from './pages/InventoryDisplay'
import * as jsonSource from './sources/cards.json';
import { loadCards } from './slices/shopSlice';
import { logout } from './slices/authSlice';
import './App.css'
import config from '../config';
import { BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import { Grid, Segment, Menu } from 'semantic-ui-react';


function App() {
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cards = useSelector((state) => state.shop.cards);
  const [loadShopOrInv, setShopOrInv] = useState(false);


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
    <>
          <BrowserRouter>
                <div>
                  <Routes>
                      <Route path='/' element={verifyLogin()} />
                      <Route path='/signup' element={<FormDisplay/>} />
                      <Route path='/login' element={<FormDisplay/>} />
                      <Route path='/inventory' element={<InventoryDisplay/>} />
                      <Route path ='/shop' element = {<ShopDisplay/>}/>

                  </Routes>
                </div>
          </BrowserRouter>
    </>


  )
}

export default App;

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
            <div>
              { loadShopOrInv
                ? <button onClick={handleLoadInventory}>Shop</button>
                : <button onClick={handleLoadInventory}>Inventory</button>
              }

            </div>
          )}
        */}