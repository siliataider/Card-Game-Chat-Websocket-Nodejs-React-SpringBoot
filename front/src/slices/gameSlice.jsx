import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    selectedCards: [],
    otherUsers: [],
  },
  reducers: {
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    }
  },
});

export const { setSelectedCards, setOtherUsers } = gameSlice.actions;

export default gameSlice.reducer;