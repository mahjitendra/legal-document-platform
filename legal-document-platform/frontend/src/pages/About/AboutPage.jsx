import React from 'react';
import Card from '../../components/common/Card/Card';

const AboutPage = () => {
  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>About Legal Document Platform</h1>

      <Card style={{ marginTop: '20px' }}>
        <h2>Our Mission</h2>
        <p>
          To simplify legal documentation and make it accessible to everyone. We provide
          easy-to-use tools for creating, managing, and signing legal documents online.
        </p>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <h2>What We Offer</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Document Templates for various legal needs</li>
          <li>Digital Signature Services</li>
          <li>Legal Consultation Booking</li>
          <li>Secure Document Storage</li>
          <li>Payment Integration</li>
        </ul>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <h2>Why Choose Us</h2>
        <p>
          With years of experience in legal technology, we understand the challenges
          of creating and managing legal documents. Our platform is designed to be
          simple, secure, and efficient.
        </p>
      </Card>
    </div>
  );
};

export default AboutPage;
