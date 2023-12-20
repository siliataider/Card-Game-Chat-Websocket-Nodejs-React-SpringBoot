import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUserId: null,
    userCards: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.currentUserId = action.payload;
      console.log('loginSucess reducer')
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUserId = null;
      console.log('logout reducer')
    },
    setUserCards: (state, action) => {
      state.userCards = action.payload;
    }
  },
});

export const { loginSuccess, logout, setUserCards } = authSlice.actions;

export default authSlice.reducer;
