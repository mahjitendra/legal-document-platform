import axios from '../axios.config';

const register = (username, password) => {
  return axios.post('/auth/register', {
    username,
    password,
  });
};

const login = (username, password) => {
  return axios.post('/auth/login', {
    username,
    password,
  });
};

const authService = {
  register,
  login,
};

export default authService;