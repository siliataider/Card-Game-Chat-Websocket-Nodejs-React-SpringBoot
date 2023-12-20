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

const handleLoadInventory = () => {
    navigate('/shop')
}

return(

    <>
        <div>
            <Inventory/>
        </div>
        <button onClick={handleLoadInventory}>Shop</button>
    </>

)

}

export default InventoryDisplay;