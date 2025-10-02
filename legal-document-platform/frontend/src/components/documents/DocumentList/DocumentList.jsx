import React, { useEffect, useState } from 'react';
import documentService from '../../../src/api/services/documentService';
import DocumentCard from '../DocumentCard/DocumentCard';
import { useNavigate } from 'react-router-dom';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadDocs = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await documentService.getDocuments();
      setDocuments(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleOpen = (id) => navigate(`/documents/${id}`);
  const handleDelete = async (id) => {
    await documentService.deleteDocument(id);
    loadDocs();
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div style={{ color: 'salmon' }}>{error}</div>;

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {documents.map((d) => (
        <DocumentCard key={d.id} doc={d} onOpen={handleOpen} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default DocumentList;

