import React, { useState, useEffect } from 'react';
import documentService from '../../api/services/documentService';
import { Link } from 'react-router-dom';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await documentService.getDocuments();
        setDocuments(response.data);
      } catch (err) {
        setError('Failed to fetch documents.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Documents</h1>
      <Link to="/documents/create">Create New Document</Link>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <Link to={`/documents/${doc.id}`}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;