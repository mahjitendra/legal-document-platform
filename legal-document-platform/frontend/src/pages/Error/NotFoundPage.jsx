import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const NotFoundPage = () => {
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
      <h1 style={{ fontSize: '120px', margin: '0', color: '#3498db' }}>404</h1>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
