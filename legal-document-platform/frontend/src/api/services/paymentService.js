import axios from '../axios.config';

const createPaymentIntent = (amount) => {
  return axios.post('/payments/create-payment-intent', { amount });
};

const paymentService = {
  createPaymentIntent,
};

export default paymentService;