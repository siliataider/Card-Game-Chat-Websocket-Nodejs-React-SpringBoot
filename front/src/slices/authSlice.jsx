import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUserId: null,
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
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
