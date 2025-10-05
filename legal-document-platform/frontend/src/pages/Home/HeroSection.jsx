import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 'bold' }}>
          Legal Documents Made Simple
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.9 }}>
          Create, manage, and sign legal documents with ease. Trusted by thousands of users.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            onClick={() => navigate('/register')}
            style={{ background: 'white', color: '#667eea', padding: '15px 40px', fontSize: '16px' }}
          >
            Get Started Free
          </Button>
          <Button
            onClick={() => navigate('/templates')}
            variant="secondary"
            style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '15px 40px', fontSize: '16px' }}
          >
            Browse Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
