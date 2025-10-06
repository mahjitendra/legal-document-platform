import React, { useState } from 'react';
import { usePayment } from '../../../hooks/usePayment';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import styles from './PaymentForm.module.css';

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const { createPayment, verifyPayment, initializeRazorpay } = usePayment();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const res = await initializeRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load');
      setLoading(false);
      return;
    }

    const paymentData = {
      amount: amount,
      currency: 'INR',
      description: 'Document purchase'
    };

    const result = await createPayment(paymentData);

    if (result.success) {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: result.data.currency,
        name: 'Legal Document Platform',
        description: 'Document Purchase',
        order_id: result.data.order_id,
        handler: async function (response) {
          const verifyResult = await verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResult.success) {
            onSuccess && onSuccess(verifyResult.data);
          } else {
            onError && onError(verifyResult.error);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3498db'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      onError && onError(result.error);
    }

    setLoading(false);
  };

  return (
    <Card>
      <h3 className={styles.title}>Payment Details</h3>

      <div className={styles.summary}>
        <div className={styles.row}>
          <span>Amount:</span>
          <span className={styles.amount}>₹{amount}</span>
        </div>
      </div>

      <Button onClick={handlePayment} loading={loading} fullWidth>
        Pay ₹{amount}
      </Button>

      <p className={styles.secure}>
        🔒 Secure payment powered by Razorpay
      </p>
    </Card>
  );
};

export default PaymentForm;
