import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: null,
    page: 0,
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
        name: 'wtime_perc',
        label: 'IWall%',
        width: '5%',
        format: 'percent',
      },
      {
        name: 'cpu_pecr',
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
    enabledColumns: [
      // 'parent',
      'function',
      'calls',
      'wtime',
      'cpu',
      'mem_usage',
      'mem_usage_peek',
      // 'wtime_perc',
      // 'cpu_pecr',
      // 'mem_usage_perc',
      // 'mem_usage_peek_perc',
    ],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 0;
    },
    setPage: (state, action) => {
      state.page = parseInt(action.payload);
    },
    setEnabledColumns: (state, action) => {
      state.enabledColumns = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter, setPage, setEnabledColumns } = filterSlice.actions;

export default filterSlice.reducer;
