import { createSlice } from '@reduxjs/toolkit';
import { getItemFromStorage, getArrayFromStorage, saveItemToStorage, saveArrayToStorage } from '../Utils/LocalStorage';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
    filterParentChild: '',
    page: 0,
    count: 0,
    itemsPerPage: getItemFromStorage('itemsPerPage', 100),
    sortDirection: getItemFromStorage('sortDirection', 'desc'),
    sortBy: getItemFromStorage('sortBy', 'wtime'),
    columns: [
      { name: 'parent', label: 'Parent', width: '22.5%' },
      { name: 'function', label: 'Function', width: '22.5%' },
      { name: 'calls', label: 'Calls', width: '5%', format: 'number' },
      {
        name: 'wtime',
        label: 'Wall Time',
        width: '5%',
        format: 'time',
        description: 'microseconds',
      },
      {
        name: 'cpu',
        label: 'CPU',
        width: '5%',
        format: 'time',
        description: 'microseconds',
      },
      {
        name: 'mem_usage',
        label: 'Memory',
        width: '5%',
        format: 'bytes',
        description: 'bytes',
      },
      {
        name: 'mem_usage_peek',
        label: 'Peek',
        width: '5%',
        format: 'bytes',
        description: 'bytes',
      },
      {
        name: 'calls_perc',
        label: 'Calls%',
        width: '5%',
        format: 'percent',
      },
      {
        name: 'wtime_perc',
        label: 'IWall%',
        width: '5%',
        format: 'percent',
      },
      {
        name: 'cpu_perc',
        label: 'ICpu%',
        width: '5%',
        format: 'percent',
      },
      {
        name: 'mem_usage_perc',
        label: 'IMU%',
        width: '5%',
        format: 'percent',
      },
      {
        name: 'mem_usage_peek_perc',
        label: 'IPMU%',
        width: '5%',
        format: 'percent',
      },
    ],
    enabledColumns: getArrayFromStorage('enabledColumns', [
      'parent',
      'function',
      'calls',
      'wtime',
      'cpu',
      'mem_usage',
      'mem_usage_peek',
      // 'calls_perc',
      // 'wtime_perc',
      // 'cpu_perc',
      // 'mem_usage_perc',
      // 'mem_usage_peek_perc',
    ]),
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 0;
    },
    setFilterParentChild: (state, action) => {
      state.filterParentChild = action.payload;
    },
    setPage: (state, action) => {
      state.page = parseInt(action.payload);
    },
    setEnabledColumns: (state, action) => {
      state.enabledColumns = action.payload;
      saveArrayToStorage('enabledColumns', action.payload);
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = parseInt(action.payload);
      saveItemToStorage('itemsPerPage', parseInt(action.payload));
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
      saveItemToStorage('sortDirection', action.payload);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      saveItemToStorage('sortBy', action.payload);
    },
    setCount: (state, action) => {
      state.count = parseInt(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilter,
  setPage,
  setEnabledColumns,
  setFilterParentChild,
  setItemsPerPage,
  setSortDirection,
  setSortBy,
  setCount,
} = filterSlice.actions;

export default filterSlice.reducer;
