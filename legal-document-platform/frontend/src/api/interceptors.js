import axios from './axios.config';
import { getToken, removeToken } from '../utils/storageUtils';

export const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const response = await axios.post('/auth/refresh', { refreshToken });
            const { access_token } = response.data;

            localStorage.setItem('token', access_token);

            originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          removeToken();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
