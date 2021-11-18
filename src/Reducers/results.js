import { createSlice } from '@reduxjs/toolkit';

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    sequence: 0,
    results: [],
  },
  reducers: {
    // Append one result to array of results
    addResult: (state, action) => {
      state.results[state.sequence] = {
        id: state.sequence,
        file: action.payload,
      };
      state.sequence += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addResult } = resultsSlice.actions;

export default resultsSlice.reducer;
