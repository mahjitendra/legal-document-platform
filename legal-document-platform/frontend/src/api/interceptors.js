import instance from './axios.config';
import storage from '../utils/storageUtils';

// Attach token
instance.interceptors.request.use((config) => {
  const token = storage.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      storage.remove('auth_token');
      storage.remove('auth_user');
      // Optional: redirect can be handled at app level
    }
    return Promise.reject(error);
  }
);

export default instance;

