import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';

const UsersManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', created: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', created: '2024-01-20' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'lawyer', status: 'active', created: '2024-02-01' }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '30px' }}>Users Management</h1>

      <Card style={{ marginBottom: '30px' }}>
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Created</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{user.name}</td>
                  <td style={{ padding: '15px' }}>{user.email}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: user.role === 'admin' ? '#e3f2fd' : '#f3e5f5',
                      color: user.role === 'admin' ? '#1976d2' : '#7b1fa2',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: user.status === 'active' ? '#e8f5e9' : '#ffebee',
                      color: user.status === 'active' ? '#2e7d32' : '#c62828',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#666' }}>{user.created}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleStatusToggle(user.id)}
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default UsersManagementPage;
