import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const ErrorPage = ({ message = 'Something went wrong' }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: '#e74c3c' }}>Error</h1>
      <p style={{ fontSize: '18px', color: '#666', margin: '20px 0' }}>{message}</p>
      <Button onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </div>
  );
};

export default ErrorPage;
