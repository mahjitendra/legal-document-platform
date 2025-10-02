import { createSlice } from '@reduxjs/toolkit';
import storage from '../../utils/storageUtils';

const initialState = {
  token: storage.get('auth_token'),
  user: storage.get('auth_user'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      storage.set('auth_token', state.token);
      storage.set('auth_user', state.user);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      storage.remove('auth_token');
      storage.remove('auth_user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

