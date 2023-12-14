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
      console.log('setCurrentCard reducer')
    },
    loadCards: (state, action) => {
      state.cards = action.payload;
      console.log('loadCards reducer', state.cards)
    },
  },
});

export const { loadCards, setCurrentCard } = shopSlice.actions;

export default shopSlice.reducer;