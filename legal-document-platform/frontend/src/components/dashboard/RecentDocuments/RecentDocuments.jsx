import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../common/Card/Card';
import styles from './RecentDocuments.module.css';
import { formatDate } from '../../../utils/helpers';

const RecentDocuments = ({ documents = [] }) => {
  if (documents.length === 0) {
    return (
      <Card>
        <h3>Recent Documents</h3>
        <p className={styles.empty}>No documents yet</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.header}>
        <h3>Recent Documents</h3>
        <Link to="/documents" className={styles.viewAll}>View All</Link>
      </div>

      <div className={styles.list}>
        {documents.slice(0, 5).map(doc => (
          <Link key={doc.id} to={`/documents/${doc.id}`} className={styles.item}>
            <div className={styles.info}>
              <div className={styles.title}>{doc.title}</div>
              <div className={styles.date}>{formatDate(doc.created_at)}</div>
            </div>
            <span className={`${styles.status} ${styles[doc.status]}`}>
              {doc.status}
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default RecentDocuments;
