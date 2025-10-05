import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '40px', marginBottom: '20px' }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>
          Join thousands of users who trust us with their legal documents
        </p>
        <Button
          onClick={() => navigate('/register')}
          style={{
            background: 'white',
            color: '#667eea',
            padding: '15px 50px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          Create Free Account
        </Button>
        <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.8 }}>
          No credit card required
        </p>
      </div>
    </section>
  );
};

export default CTASection;
