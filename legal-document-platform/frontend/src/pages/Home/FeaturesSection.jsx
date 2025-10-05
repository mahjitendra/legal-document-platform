import React from 'react';
import Card from '../../components/common/Card/Card';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📄',
      title: 'Document Templates',
      description: 'Choose from hundreds of professionally drafted legal templates'
    },
    {
      icon: '✍️',
      title: 'Digital Signatures',
      description: 'Sign documents electronically with legally binding digital signatures'
    },
    {
      icon: '🔒',
      title: 'Secure Storage',
      description: 'Your documents are encrypted and stored securely in the cloud'
    },
    {
      icon: '👨‍⚖️',
      title: 'Legal Consultation',
      description: 'Get expert legal advice from qualified professionals'
    },
    {
      icon: '💳',
      title: 'Easy Payments',
      description: 'Secure payment integration for all your transactions'
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Access your documents anytime, anywhere from any device'
    }
  ];

  return (
    <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '50px' }}>
          Why Choose Us
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {features.map((feature, index) => (
            <Card key={index} hoverable>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>{feature.icon}</div>
              <h3 style={{ marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
