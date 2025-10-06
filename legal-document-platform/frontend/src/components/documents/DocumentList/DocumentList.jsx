import React from 'react';
import DocumentCard from '../DocumentCard/DocumentCard';
import styles from './DocumentList.module.css';

const DocumentList = ({ documents, loading }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading documents...</p>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📄</div>
        <h3>No documents found</h3>
        <p>Create your first document to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  );
};

export default DocumentList;
