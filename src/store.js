import { combineReducers } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import filesReducer from './Reducers/files';
import paginationReducer from './Reducers/pagination';

const rootReducer = combineReducers({
  files: filesReducer,
  pagination: paginationReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
