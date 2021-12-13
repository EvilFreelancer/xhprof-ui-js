import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    isTreeView: false,
  },
  reducers: {
    switchTreeView: (state, action) => {
      state.isTreeView = !state.isTreeView;
    },
  },
});

export const { switchTreeView } = modeSlice.actions;

export default modeSlice.reducer;
