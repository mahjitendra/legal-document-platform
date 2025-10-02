import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import DocumentList from '../../components/documents/DocumentList/DocumentList';

const DocumentsPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Documents</h1>
        <Link to="/documents/create">Create New Document</Link>
      </div>
      <DocumentList onOpen={(id) => navigate(`/documents/${id}`)} />
    </Layout>
  );
};

export default DocumentsPage;