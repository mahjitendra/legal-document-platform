import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Card from '../../common/Card/Card';
import styles from './PaymentForm.module.css';

const PaymentForm = ({ amount, onSubmit, loading }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod, amount });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Payment Details</h3>

        <div className={styles.amountDisplay}>
          <span>Amount to Pay:</span>
          <strong>Rs. {amount}</strong>
        </div>

        <div className={styles.methodSelection}>
          <label>
            <input
              type="radio"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Razorpay (Cards, UPI, Net Banking)
          </label>
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Proceed to Pay
        </Button>
      </form>
    </Card>
  );
};

export default PaymentForm;
