import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  return (
    <main style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Welcome {user?.username || 'User'}.</p>
      <button onClick={logout}>Logout</button>
    </main>
  );
};

export default DashboardPage;

