import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transaction_id');

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <Card>
        <div style={{ fontSize: '64px', color: '#2ecc71', marginBottom: '20px' }}>✓</div>
        <h1 style={{ color: '#2ecc71' }}>Payment Successful!</h1>
        <p style={{ color: '#666', margin: '20px 0' }}>
          Your payment has been processed successfully.
        </p>
        {transactionId && (
          <p style={{ color: '#999', fontSize: '14px' }}>
            Transaction ID: {transactionId}
          </p>
        )}
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button variant="secondary" onClick={() => navigate('/documents')}>
            View Documents
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
