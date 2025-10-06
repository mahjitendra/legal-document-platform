import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import { formatDate } from '../../../utils/helpers';
import styles from './DocumentCard.module.css';

const DocumentCard = ({ document }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      draft: '#95a5a6',
      pending: '#f39c12',
      completed: '#2ecc71',
      signed: '#9b59b6',
      archived: '#7f8c8d'
    };
    return colors[status] || '#95a5a6';
  };

  return (
    <Card
      hoverable
      onClick={() => navigate(`/documents/${document.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{document.title}</h3>
        <span
          className={styles.status}
          style={{ background: getStatusColor(document.status) }}
        >
          {document.status}
        </span>
      </div>

      <div className={styles.meta}>
        <span>📁 {document.category || 'General'}</span>
        <span>📅 {formatDate(document.created_at)}</span>
      </div>

      {document.description && (
        <p className={styles.description}>{document.description}</p>
      )}

      <div className={styles.actions}>
        <button className={styles.actionBtn}>View</button>
        <button className={styles.actionBtn}>Edit</button>
        <button className={styles.actionBtn}>Download</button>
      </div>
    </Card>
  );
};

export default DocumentCard;
