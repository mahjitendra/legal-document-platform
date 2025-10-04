import axios from '../axios.config';

export const userService = {
  getProfile: async () => {
    const response = await axios.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axios.put('/users/profile', data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await axios.post('/users/change-password', data);
    return response.data;
  },

  getUsers: async (params) => {
    const response = await axios.get('/users', { params });
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
  },
};
