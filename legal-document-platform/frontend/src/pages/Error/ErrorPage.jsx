import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '120px', marginBottom: '20px' }}>⚠️</div>
      <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#e74c3c' }}>
        Oops! Something went wrong
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px', maxWidth: '500px' }}>
        We encountered an unexpected error. Please try again or contact support if the problem persists.
      </p>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button onClick={() => window.location.reload()}>
          Reload Page
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Go Home
        </Button>
        <Button variant="secondary" onClick={() => navigate('/contact')}>
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
