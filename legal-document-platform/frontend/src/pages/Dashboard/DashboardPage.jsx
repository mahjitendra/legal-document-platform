import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to your Dashboard, {user?.username}!</h1>
      <p>From here, you can manage your documents, book consultations, and more.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/documents">
          <Button>My Documents</Button>
        </Link>
        <Link to="/templates" style={{ marginLeft: '10px' }}>
          <Button>View Templates</Button>
        </Link>
        <Link to="/consultations" style={{ marginLeft: '10px' }}>
          <Button>My Consultations</Button>
        </Link>
        {user?.is_admin && (
          <Link to="/admin" style={{ marginLeft: '10px' }}>
            <Button>Admin Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;