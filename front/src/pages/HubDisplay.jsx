import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import {useNavigate} from 'react-router-dom';
import config from '../../config';
import LoginForm from '../components/Forms/LoginForm'
import SignupForm from '../components/Forms/SignupForm'
import { logout } from '../slices/authSlice';

const HubDisplay = () => {

const navigate = useNavigate()

const handleGoBack = () => {
    navigate('/login');
}

const handleClickInventory = () => {
    navigate('/inventory')
}

const handleClickShop = () => {
    navigate('/shop');
}

const handleClickMatch = () => {
    navigate('/opponents');
}

return(
<>
    <h1>Where would you like to go?</h1>
    <div>
       <button onClick={handleClickShop}>Shop</button>
       <button onClick={handleClickMatch}>Matchmaking</button>
       <button onClick={handleClickInventory}>Inventory</button>
       <br></br>
       <button onClick={handleGoBack}>Go back</button>
    </div>
</>
)

}

export default HubDisplay;