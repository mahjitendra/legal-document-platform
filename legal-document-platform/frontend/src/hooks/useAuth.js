import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/services/authService';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '../utils/storageUtils';

export const useAuth = () => {
  const [user, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const savedUser = getUser();

    if (token && savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      setCurrentUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      setCurrentUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      const updatedUser = response.data.user;
      setUser(updatedUser);
      setCurrentUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Update failed' };
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };
};
