import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import documentService from '../../api/services/documentService';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';

const EditDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await documentService.getDocument(id);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch document.');
      }
    };
    fetchDocument();
  }, [id]);

  const handleUpdateDocument = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await documentService.updateDocument(id, title, content);
      navigate(`/documents/${id}`);
    } catch (err) {
      setError('Failed to update document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Document</h1>
      <form onSubmit={handleUpdateDocument}>
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
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Document'}
        </Button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default EditDocumentPage;