import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import { find } from 'lodash';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    sequence: 0,
    selected: {},
    files: [],
  },
  reducers: {
    /**
     * Append one result to array of results
     * @param state
     * @param action
     * @return {number}
     */
    addFile: (state, action) => {
      state.files[state.sequence] = {
        id: state.sequence,
        file: action.payload,
      };
      state.sequence += 1;
    },

    /**
     * Selected result ID
     * @param state
     * @param action
     */
    setSelectedFile: (state, action) => {
      state.selected = find(state.files, { id: parseInt(action.payload) });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFile, setSelectedFile } = filesSlice.actions;

export default filesSlice.reducer;
