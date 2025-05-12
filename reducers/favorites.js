import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.value.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.value = state.value.filter(bookmark => bookmark.recipeId !== action.payload.recipeId);
    },
  },
});

export const { addBookmark, removeBookmark } = favoritesSlice.actions;
export default favoritesSlice.reducer;