import React, { useEffect, useState } from 'react';
import documentService from '../../../src/api/services/documentService';

const DocumentEditor = ({ id, onSaved }) => {
  const isNew = !id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await documentService.getDocument(id);
        setTitle(res.data.title || '');
        setContent(res.data.content || '');
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load document');
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      if (isNew) {
        const res = await documentService.createDocument(title, content);
        onSaved?.(res.data);
      } else {
        const res = await documentService.updateDocument(id, title, content);
        onSaved?.(res.data);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea rows={16} placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      {error && <div style={{ color: 'salmon' }}>{error}</div>}
      <button onClick={handleSave} disabled={saving || !title || !content}>
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
};

export default DocumentEditor;

