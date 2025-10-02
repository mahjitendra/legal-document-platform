import React, { useState } from 'react';
import paymentService from '../../api/services/paymentService';
import Button from '../../components/common/Button/Button';

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // This is a mock amount. In a real app, you'd get this from the context or props.
  const amount = 1000; // e.g., 10.00 USD

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // In a real app, you would use a library like Stripe.js or Razorpay Checkout
      // to handle the payment flow on the frontend.
      // 1. Create a payment intent on the backend.
      const response = await paymentService.createPaymentIntent(amount);
      const { clientSecret, paymentId } = response.data;

      // 2. Use the clientSecret to confirm the payment on the frontend.
      // This is a mock confirmation.
      console.log(`Processing payment ${paymentId} with client secret ${clientSecret}`);
      setMessage('Payment successful!');
      // You would then redirect to a success page.
      // navigate('/payment/success');
    } catch (err) {
      setError('Payment failed. Please try again.');
      // You would then redirect to a failure page.
      // navigate('/payment/failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <p>Amount: ${amount / 100}</p>
        <Button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {message && <div style={{ color: 'green' }}>{message}</div>}
      </div>
    </div>
  );
};

export default CheckoutPage;