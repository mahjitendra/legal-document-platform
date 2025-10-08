import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import documentReducer from './slices/documentSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
import notificationReducer from './slices/notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentReducer,
  user: userReducer,
  payment: paymentReducer,
  notifications: notificationReducer,
});

export default rootReducer;
