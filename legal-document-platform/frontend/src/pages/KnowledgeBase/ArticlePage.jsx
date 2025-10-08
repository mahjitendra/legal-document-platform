import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const mockArticles = {
      '1': {
        id: 1,
        title: 'Understanding Rental Agreements in India',
        category: 'Property Law',
        content: `
          <h2>What is a Rental Agreement?</h2>
          <p>A rental agreement is a legal contract between a landlord and tenant that outlines the terms and conditions of renting a property.</p>

          <h3>Key Components:</h3>
          <ul>
            <li>Names and addresses of landlord and tenant</li>
            <li>Property details and description</li>
            <li>Rent amount and payment schedule</li>
            <li>Security deposit amount</li>
            <li>Duration of agreement</li>
            <li>Maintenance responsibilities</li>
          </ul>

          <h3>Important Considerations:</h3>
          <p>Always register rental agreements exceeding 11 months with the Sub-Registrar office. This provides legal protection to both parties.</p>

          <h3>Stamp Duty:</h3>
          <p>Rental agreements must be printed on stamp paper of appropriate value, which varies by state.</p>
        `,
        author: 'Legal Team',
        publishedDate: '2024-01-15',
        readTime: '5 min read'
      }
    };

    setArticle(mockArticles[id] || null);
  }, [id]);

  if (!article) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2>Article not found</h2>
        <Button onClick={() => navigate('/knowledge-base')}>Back to Knowledge Base</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <Button variant="secondary" onClick={() => navigate('/knowledge-base')} style={{ marginBottom: '20px' }}>
        ← Back to Knowledge Base
      </Button>

      <Card>
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            padding: '4px 12px',
            background: '#e3f2fd',
            color: '#1976d2',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {article.category}
          </span>
        </div>

        <h1 style={{ marginBottom: '20px' }}>{article.title}</h1>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', fontSize: '14px', color: '#666' }}>
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.publishedDate}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <div
          style={{ lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Need Legal Assistance?</h3>
          <p style={{ marginBottom: '15px' }}>Connect with our legal experts for personalized guidance.</p>
          <Button onClick={() => navigate('/consultations')}>Book Consultation</Button>
        </div>
      </Card>
    </div>
  );
};

export default ArticlePage;
