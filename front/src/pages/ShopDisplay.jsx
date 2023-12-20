import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import config from '../../config';
import Shop from '../components/Shop/Shop'
import { logout } from '../slices/authSlice';
import Inventory from '../components/Shop/Shop'
import { useNavigate } from "react-router-dom";

const InventoryDisplay = () => {

const navigate = useNavigate();

const handleClickInventory = () => {
    navigate('/inventory')

}

const handleGoBack = () => {
    navigate('/');
}

return(

    <>
        <div>
            <Shop/>
        </div>
        <button onClick={handleClickInventory}>Inventory</button>
        <button onClick={handleGoBack}>Go back</button>
    </>

)

}

export default InventoryDisplay;