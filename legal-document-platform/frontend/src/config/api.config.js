export const apiConfig = {
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      verifyEmail: '/auth/verify-email',
    },
    users: {
      profile: '/users/profile',
      updateProfile: '/users/profile',
      changePassword: '/users/change-password',
    },
    documents: {
      list: '/documents',
      create: '/documents',
      get: (id) => `/documents/${id}`,
      update: (id) => `/documents/${id}`,
      delete: (id) => `/documents/${id}`,
      download: (id) => `/documents/${id}/download`,
      sign: (id) => `/documents/${id}/sign`,
    },
    templates: {
      list: '/templates',
      get: (id) => `/templates/${id}`,
      create: '/templates',
      update: (id) => `/templates/${id}`,
      delete: (id) => `/templates/${id}`,
    },
    payments: {
      create: '/payments',
      verify: '/payments/verify',
      history: '/payments/history',
    },
    consultations: {
      list: '/consultations',
      create: '/consultations',
      get: (id) => `/consultations/${id}`,
      update: (id) => `/consultations/${id}`,
      cancel: (id) => `/consultations/${id}/cancel`,
    },
    notifications: {
      list: '/notifications',
      markAsRead: (id) => `/notifications/${id}/read`,
      markAllAsRead: '/notifications/read-all',
      unreadCount: '/notifications/unread-count',
    },
  },

  headers: {
    common: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    upload: {
      'Content-Type': 'multipart/form-data',
    },
  },

  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
};
