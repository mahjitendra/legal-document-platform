import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>✗</div>
      <h1 style={{ color: '#e74c3c', marginBottom: '10px' }}>Payment Failed</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Unfortunately, your payment could not be processed. Please try again.
      </p>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button onClick={() => navigate('/payment/checkout')}>
          Try Again
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
