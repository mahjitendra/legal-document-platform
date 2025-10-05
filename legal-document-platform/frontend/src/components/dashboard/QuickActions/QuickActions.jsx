import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../common/Card/Card';
import styles from './QuickActions.module.css';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Create Document',
      description: 'Start a new document',
      icon: '📄',
      path: '/documents/create',
      color: '#3498db'
    },
    {
      title: 'Browse Templates',
      description: 'Use ready-made templates',
      icon: '📋',
      path: '/templates',
      color: '#2ecc71'
    },
    {
      title: 'Book Consultation',
      description: 'Talk to a lawyer',
      icon: '👨‍⚖️',
      path: '/consultations/book',
      color: '#f39c12'
    },
    {
      title: 'View Documents',
      description: 'Access your documents',
      icon: '📁',
      path: '/documents',
      color: '#9b59b6'
    }
  ];

  return (
    <Card>
      <h3>Quick Actions</h3>
      <div className={styles.grid}>
        {actions.map((action, index) => (
          <div
            key={index}
            className={styles.action}
            onClick={() => navigate(action.path)}
            style={{ borderLeftColor: action.color }}
          >
            <div className={styles.icon}>{action.icon}</div>
            <div className={styles.content}>
              <div className={styles.title}>{action.title}</div>
              <div className={styles.description}>{action.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
