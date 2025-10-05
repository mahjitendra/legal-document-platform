import axios from '../axios.config';

const getAuthHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getAllUsers = (token) => {
  return axios.get('/admin/users', getAuthHeaders(token));
};

const adminService = {
  getAllUsers,
};

export default adminService;