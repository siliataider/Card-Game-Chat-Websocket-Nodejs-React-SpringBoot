import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    otherUsers: [],

    currentSocketID: null,
    currentID: null,
    opponentSocketID: null,
    opponentID: null,
    selectedCards: [],
    opponentCards: []
  },
  reducers: {
    setcurrentSocketID: (state, action) => {
      state.currentSocketID = action.payload;
      console.log("++++++ gameslice ", state.currentSocketID)
    },
    setcurrentID: (state, action) => {
      state.currentID = action.payload;
    },
    setopponentSocketID: (state, action) => {
      state.opponentSocketID = action.payload;
    },
    setopponentID: (state, action) => {
      state.opponentID = action.payload;
    },
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;
    },
    setopponentCards: (state, action) => {
      state.opponentCards = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
  },
});

export const { setcurrentSocketID, setcurrentID, setopponentSocketID, setopponentID, setSelectedCards, setopponentCards, setOtherUsers } = gameSlice.actions;

export default gameSlice.reducer;