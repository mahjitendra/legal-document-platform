import { useState } from 'react';
import { paymentService } from '../api/services/paymentService';
import { handleApiError } from '../utils/errorHandlers';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentService.createPayment(paymentData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      return { success: false, error: errorInfo.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentService.verifyPayment(paymentData);
      return { success: true, data: response.data };
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      return { success: false, error: errorInfo.message };
    } finally {
      setLoading(false);
    }
  };

  const getPaymentHistory = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paymentService.getPaymentHistory(params);
      return { success: true, data: response.data };
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      return { success: false, error: errorInfo.message };
    } finally {
      setLoading(false);
    }
  };

  const initializeRazorpay = (options) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return {
    loading,
    error,
    createPayment,
    verifyPayment,
    getPaymentHistory,
    initializeRazorpay,
  };
};
