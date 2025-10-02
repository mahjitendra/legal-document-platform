import React from 'react';

const DocumentCard = ({ doc, onOpen, onDelete }) => {
  return (
    <div style={{ border: '1px solid #1f2937', padding: '1rem', borderRadius: 8 }}>
      <h3 style={{ margin: 0 }}>{doc.title}</h3>
      <p style={{ color: '#94a3b8' }}>{new Date(doc.created_at || Date.now()).toLocaleString()}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => onOpen(doc.id)}>Open</button>
        <button onClick={() => onDelete(doc.id)} style={{ color: 'salmon' }}>Delete</button>
      </div>
    </div>
  );
};

export default DocumentCard;

