import { createSlice } from '@reduxjs/toolkit';
import { find, remove } from 'lodash';
import { parseJson } from '../Utils/FilesProcessing';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    sequence: 0,
    selected: {},
    compared: {},
    files: [],
  },
  reducers: {
    /**
     * Append one result to array of results
     *
     * @param state
     * @param action
     * @return {number}
     */
    addFile: (state, action) => {
      let parsedJson = parseJson(action.payload.json);

      // Save file
      let payload = {
        id: state.sequence,
        name: action.payload.file.name,
        size: action.payload.file.size,
        json: action.payload.json,
        result: parsedJson.output,
        callsTotal: parsedJson.callsTotal,
        main: action.payload.json['main()'],
      };
      state.files[state.sequence] = payload;
      state.sequence += 1;

      // Select first file
      if (state.sequence === 1) {
        state.selected = payload;
      }
    },

    /**
     * Delete file from files array by ID,
     * if this file selected then also need
     * to cleanup "selected".
     *
     * @param state
     * @param action
     */
    deleteFile: (state, action) => {
      let fileId = parseInt(action.payload);

      // Clean compared
      if (!!state.compared && state.compared.id === fileId) {
        state.compared = {};
      }

      // If deletable file is selected, then unselect and compared too
      if (!!state.selected && state.selected.id === fileId) {
        state.selected = {};
        state.compared = {};
      }

      // Remove object from list of files
      remove(state.files, function (file) {
        return file.id === fileId; //remove if color is green
      });
    },

    /**
     * Selected result ID
     *
     * @param state
     * @param action
     */
    setSelectedFile: (state, action) => {
      if (null === action.payload) {
        state.selected = {};
      } else {
        let fileId = parseInt(action.payload);
        state.selected = find(state.files, { id: fileId });
      }
    },

    /**
     * Selected second result ID for comparing
     *
     * @param state
     * @param action
     */
    setComparedFile: (state, action) => {
      if (null === action.payload) {
        state.compared = {};
      } else {
        state.compared = find(state.files, { id: parseInt(action.payload) });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFile, deleteFile, setSelectedFile, setComparedFile } = filesSlice.actions;

export default filesSlice.reducer;
