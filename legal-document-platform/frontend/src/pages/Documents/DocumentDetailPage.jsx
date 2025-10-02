import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import documentService from '../../api/services/documentService';
import Button from '../../components/common/Button/Button';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const response = await documentService.getDocument(id);
        setDocument(response.data);
      } catch (err) {
        setError('Failed to fetch document.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentService.deleteDocument(id);
        navigate('/documents');
      } catch (err) {
        setError('Failed to delete document.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!document) {
    return <div>Document not found.</div>;
  }

  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.content}</p>
      <Button onClick={() => navigate(`/documents/edit/${id}`)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default DocumentDetailPage;