import React from 'react';
import Card from '../../components/common/Card/Card';

const AboutPage = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>About Us</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '18px' }}>
        Simplifying legal documentation for everyone
      </p>

      <Card style={{ marginBottom: '30px' }}>
        <h2>Our Mission</h2>
        <p style={{ lineHeight: '1.8', color: '#555' }}>
          We believe that legal documentation should be accessible, affordable, and easy to understand
          for everyone. Our platform empowers individuals and businesses to create legally valid
          documents without the need for expensive lawyers or complicated processes.
        </p>
      </Card>

      <Card style={{ marginBottom: '30px' }}>
        <h2>What We Offer</h2>
        <ul style={{ lineHeight: '2', color: '#555' }}>
          <li>Professionally drafted legal document templates</li>
          <li>Digital signature capabilities for secure document signing</li>
          <li>Cloud-based storage for easy access and management</li>
          <li>Access to qualified legal professionals for consultations</li>
          <li>Secure payment processing for all transactions</li>
          <li>24/7 customer support to assist you</li>
        </ul>
      </Card>

      <Card>
        <h2>Why Choose Us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div>
            <h3 style={{ color: '#3498db' }}>🔒 Secure</h3>
            <p style={{ color: '#666' }}>Bank-grade encryption protects your sensitive documents</p>
          </div>
          <div>
            <h3 style={{ color: '#2ecc71' }}>✓ Trusted</h3>
            <p style={{ color: '#666' }}>Used by thousands of satisfied customers across India</p>
          </div>
          <div>
            <h3 style={{ color: '#f39c12' }}>⚡ Fast</h3>
            <p style={{ color: '#666' }}>Create documents in minutes, not hours or days</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;
