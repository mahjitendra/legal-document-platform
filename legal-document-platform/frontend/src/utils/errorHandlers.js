export const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error || 'An error occurred';

    switch (status) {
      case 400:
        return { status, message: message || 'Bad request' };
      case 401:
        return { status, message: 'Unauthorized. Please login again.' };
      case 403:
        return { status, message: 'Access forbidden' };
      case 404:
        return { status, message: 'Resource not found' };
      case 422:
        return { status, message: message, errors: error.response.data?.errors };
      case 500:
        return { status, message: 'Server error. Please try again later.' };
      default:
        return { status, message };
    }
  } else if (error.request) {
    return {
      status: 0,
      message: 'Network error. Please check your internet connection.',
    };
  } else {
    return {
      status: -1,
      message: error.message || 'An unexpected error occurred',
    };
  }
};

export const logError = (error, context = '') => {
  console.error(`Error ${context}:`, error);

  if (process.env.NODE_ENV === 'production') {
  }
};

export const showErrorNotification = (error, notificationFn) => {
  const errorInfo = handleApiError(error);
  if (notificationFn) {
    notificationFn(errorInfo.message);
  }
  return errorInfo;
};
