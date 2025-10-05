import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <h1>Welcome to the Legal Document Platform</h1>
      <p>Create, manage, and sign your legal documents with ease.</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/register">
          <Button>Get Started</Button>
        </Link>
        <Link to="/login" style={{ marginLeft: '10px' }}>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;