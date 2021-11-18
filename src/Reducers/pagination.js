import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: null,
    page: 0,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 0;
    },
    setPage: (state, action) => {
      state.page = parseInt(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter, setPage } = filterSlice.actions;

export default filterSlice.reducer;
