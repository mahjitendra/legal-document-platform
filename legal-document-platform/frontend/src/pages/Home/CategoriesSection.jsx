import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Rental Agreements', icon: '🏠', count: '150+ templates' },
    { name: 'Employment Contracts', icon: '💼', count: '80+ templates' },
    { name: 'NDA Documents', icon: '🤐', count: '45+ templates' },
    { name: 'Sale Agreements', icon: '📝', count: '120+ templates' },
    { name: 'Partnership Deeds', icon: '🤝', count: '60+ templates' },
    { name: 'Power of Attorney', icon: '⚖️', count: '35+ templates' }
  ];

  return (
    <section style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '20px' }}>
          Popular Categories
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '18px' }}>
          Browse our extensive collection of legal document templates
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {categories.map((category, index) => (
            <Card
              key={index}
              hoverable
              onClick={() => navigate('/templates')}
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>{category.icon}</div>
              <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>{category.name}</h3>
              <p style={{ color: '#999', fontSize: '14px' }}>{category.count}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
