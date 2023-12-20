import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    selectedCards: [],
  },
  reducers: {
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
  },
});

export const { setSelectedCards } = gameSlice.actions;

export default gameSlice.reducer;