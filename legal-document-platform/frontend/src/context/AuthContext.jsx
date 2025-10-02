import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import storage from '../utils/storageUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => storage.get('auth_token'));
  const [user, setUser] = useState(() => storage.get('auth_user'));

  useEffect(() => {
    storage.set('auth_token', token);
  }, [token]);

  useEffect(() => {
    storage.set('auth_user', user);
  }, [user]);

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    login: (newToken, profile) => {
      setToken(newToken);
      setUser(profile || null);
    },
    logout: () => {
      setToken(null);
      setUser(null);
      storage.remove('auth_token');
      storage.remove('auth_user');
    },
  }), [token, user]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

