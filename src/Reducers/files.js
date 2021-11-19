import { createSlice } from '@reduxjs/toolkit';
import { find } from 'lodash';
import { parseJson } from '../Utils/FilesProcessing';

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
      // Save file
      let payload = {
        id: state.sequence,
        name: action.payload.file.name,
        size: action.payload.file.size,
        json: action.payload.json,
        result: parseJson(action.payload.json),
      };
      state.files[state.sequence] = payload;
      state.sequence += 1;

      // Select first file
      if (state.sequence === 1) {
        state.selected = payload;
      }
    },

    /**
     * Selected result ID
     * @param state
     * @param action
     */
    setSelectedFile: (state, action) => {
      if (null === action.payload) {
        state.selected = {};
      } else {
        state.selected = find(state.files, { id: parseInt(action.payload) });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFile, setSelectedFile } = filesSlice.actions;

export default filesSlice.reducer;
