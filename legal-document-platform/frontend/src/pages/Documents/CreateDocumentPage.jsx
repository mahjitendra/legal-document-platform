import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import documentService from '../../api/services/documentService';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Layout from '../../components/layout/Layout';

const CreateDocumentPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await documentService.createDocument(title, content);
      navigate('/documents');
    } catch (err) {
      setError('Failed to create document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Create New Document</h1>
      <form onSubmit={handleCreateDocument} style={{ display: 'grid', gap: '0.5rem', maxWidth: 720 }}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Document'}
        </Button>
        {error && <div>{error}</div>}
      </form>
    </Layout>
  );
};

export default CreateDocumentPage;