import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main style={{ padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <h1>Legal Document Platform</h1>
      <p>Create, manage, sign, and share legal documents securely.</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
};

export default HomePage;

