import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import config from '../../config';
import LoginForm from '../components/Forms/LoginForm'
import SignupForm from '../components/Forms/SignupForm'
import { logout } from '../slices/authSlice';
import Inventory from '../components/Inventory/Inventory'
import { useNavigate } from "react-router-dom";

const InventoryDisplay = () => {

const navigate = useNavigate();

const handleClickShop = () => {
    navigate('/shop');
}

const handleGoBack = () => {
    navigate('/login');
}

const handlePickOpponent = () => {
    navigate('/opponents');
};

return(

    <>
        <div>
        <button onClick={handlePickOpponent}>Pick an Opponent</button>
            <Inventory/>
        </div>
        <button onClick={handleClickShop}>Shop</button>
        <button onClick={handleGoBack}>Go back</button>

    </>

)

}

export default InventoryDisplay;