import axios from '../axios.config';

const getAllUsers = () => {
  return axios.get('/admin/users');
};

const adminService = {
  getAllUsers,
};

export default adminService;