import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    currentCard: {},
    cards: [],
  },
  reducers: {
    setCurrentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    loadCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const { loadCards, setCurrentCard } = shopSlice.actions;

export default shopSlice.reducer;