import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import document from './slices/documentSlice';

const rootReducer = combineReducers({
  auth,
  document,
});

export default rootReducer;

