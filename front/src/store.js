import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';
import authReducer from './slices/authSlice';


export default configureStore({
  reducer: {
	shop: shopReducer ,
	auth: authReducer ,
    },
})