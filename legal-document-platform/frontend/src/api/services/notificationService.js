import axios from '../axios.config';

export const notificationService = {
  getNotifications: async (params = {}) => {
    const response = await axios.get('/notifications', { params });
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await axios.put(`/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axios.put('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (notificationId) => {
    const response = await axios.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axios.get('/notifications/unread-count');
    return response.data;
  },
};
