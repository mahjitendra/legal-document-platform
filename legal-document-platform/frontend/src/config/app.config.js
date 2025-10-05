export const appConfig = {
  appName: 'Legal Document Platform',
  appVersion: '1.0.0',
  appDescription: 'Simplifying legal documentation for everyone',

  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
    timeout: 30000,
  },

  razorpay: {
    keyId: process.env.REACT_APP_RAZORPAY_KEY_ID,
  },

  features: {
    enableNotifications: true,
    enableConsultations: true,
    enablePayments: true,
    enableDigitalSignatures: true,
  },

  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },

  upload: {
    maxFileSize: 10 * 1024 * 1024,
    allowedFileTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ],
  },

  theme: {
    defaultTheme: 'light',
    availableThemes: ['light', 'dark'],
  },

  dateFormat: {
    short: 'DD/MM/YYYY',
    long: 'DD MMMM YYYY',
    datetime: 'DD/MM/YYYY HH:mm',
  },
};
