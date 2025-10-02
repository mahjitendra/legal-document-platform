import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setDocuments(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setDocuments } = documentSlice.actions;
export default documentSlice.reducer;

