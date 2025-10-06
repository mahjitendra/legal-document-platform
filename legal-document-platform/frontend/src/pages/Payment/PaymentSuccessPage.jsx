import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const PaymentSuccessPage = () => {
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
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>✓</div>
      <h1 style={{ color: '#2ecc71', marginBottom: '10px' }}>Payment Successful!</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Your payment has been processed successfully.
      </p>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button onClick={() => navigate('/documents')}>
          View Documents
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
