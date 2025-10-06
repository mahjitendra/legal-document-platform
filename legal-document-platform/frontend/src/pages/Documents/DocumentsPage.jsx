import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../../hooks/useDocuments';
import DocumentList from '../../components/documents/DocumentList/DocumentList';
import SearchBar from '../../components/search/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';

const DocumentsPage = () => {
  const navigate = useNavigate();
  const { documents, loading, fetchDocuments } = useDocuments();
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    setFilteredDocuments(documents);
  }, [documents]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter(doc =>
      doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ margin: 0 }}>My Documents</h1>
        <Button onClick={() => navigate('/documents/create')}>
          + Create Document
        </Button>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <SearchBar onSearch={handleSearch} placeholder="Search documents..." />
      </div>

      <DocumentList documents={filteredDocuments} loading={loading} />
    </div>
  );
};

export default DocumentsPage;
