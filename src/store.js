import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from './Reducers/results';

export default configureStore({
  reducer: {
    results: resultsReducer,
  },
});
