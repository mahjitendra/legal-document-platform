import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';

const KnowledgeBasePage = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: 'How to Create a Rental Agreement',
      category: 'Rental',
      excerpt: 'Learn the essential elements of a legally binding rental agreement...'
    },
    {
      id: 2,
      title: 'Understanding Digital Signatures',
      category: 'Technology',
      excerpt: 'Everything you need to know about digital signatures and their legal validity...'
    },
    {
      id: 3,
      title: 'NDA Best Practices',
      category: 'Business',
      excerpt: 'Protect your confidential information with proper non-disclosure agreements...'
    }
  ];

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Knowledge Base</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Learn about legal documents, best practices, and platform features
      </p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {articles.map(article => (
          <Card
            key={article.id}
            hoverable
            onClick={() => navigate(`/knowledge-base/${article.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: '#e3f2fd',
              color: '#1976d2',
              borderRadius: '12px',
              fontSize: '12px',
              marginBottom: '10px'
            }}>
              {article.category}
            </span>
            <h3>{article.title}</h3>
            <p style={{ color: '#666' }}>{article.excerpt}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
