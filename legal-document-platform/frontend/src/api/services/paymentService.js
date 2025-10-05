import axios from '../axios.config';

const getAuthHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const createPaymentIntent = (amount, token) => {
  return axios.post('/payments/create-payment-intent', { amount }, getAuthHeaders(token));
};

const paymentService = {
  createPaymentIntent,
};

export default paymentService;