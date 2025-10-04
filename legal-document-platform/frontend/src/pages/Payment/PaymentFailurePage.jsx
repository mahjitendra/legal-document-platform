import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <Card>
        <div style={{ fontSize: '64px', color: '#e74c3c', marginBottom: '20px' }}>✕</div>
        <h1 style={{ color: '#e74c3c' }}>Payment Failed</h1>
        <p style={{ color: '#666', margin: '20px 0' }}>
          We couldn't process your payment. Please try again.
        </p>
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button onClick={() => navigate(-1)}>
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentFailurePage;
