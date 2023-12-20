import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice'


export default configureStore({
  reducer: {
	shop: shopReducer ,
	auth: authReducer ,
	game: gameReducer ,
    },
})