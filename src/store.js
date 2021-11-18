import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import filesReducer from './Reducers/files';

export default configureStore({
  reducer: {
    files: filesReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        // ignoredActions: ['files/addFile'],
      },
    }),
  },
});
