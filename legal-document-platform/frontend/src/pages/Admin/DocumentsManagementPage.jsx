import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const DocumentsManagementPage = () => {
  const [documents, setDocuments] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockDocuments = [
      { id: 1, title: 'Rental Agreement', user: 'John Doe', category: 'rental', status: 'signed', created: '2024-01-15' },
      { id: 2, title: 'Employment Contract', user: 'Jane Smith', category: 'employment', status: 'draft', created: '2024-01-20' },
      { id: 3, title: 'NDA Document', user: 'Bob Wilson', category: 'nda', status: 'completed', created: '2024-02-01' }
    ];
    setDocuments(mockDocuments);
  }, []);

  const filteredDocuments = filter === 'all'
    ? documents
    : documents.filter(doc => doc.status === filter);

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '30px' }}>Documents Management</h1>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        {['all', 'draft', 'completed', 'signed'].map(status => (
          <Button
            key={status}
            variant={filter === status ? 'primary' : 'secondary'}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Title</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>User</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Created</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map(doc => (
                <tr key={doc.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{doc.title}</td>
                  <td style={{ padding: '15px' }}>{doc.user}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: '#f3e5f5',
                      color: '#7b1fa2',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {doc.category}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: doc.status === 'signed' ? '#e8f5e9' : '#fff3e0',
                      color: doc.status === 'signed' ? '#2e7d32' : '#f57c00',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#666' }}>{doc.created}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <Button
                      variant="secondary"
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      View
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

export default DocumentsManagementPage;
