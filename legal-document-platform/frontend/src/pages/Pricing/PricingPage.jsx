import React from 'react';
import PricingCard from '../../components/payment/PricingCard/PricingCard';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      price: 299,
      featured: false,
      features: [
        '5 Documents per month',
        'Basic Templates',
        'Cloud Storage',
        'Email Support',
        'Digital Signatures'
      ]
    },
    {
      name: 'Professional',
      price: 599,
      featured: true,
      features: [
        '20 Documents per month',
        'Premium Templates',
        'Unlimited Cloud Storage',
        'Priority Support',
        'Digital Signatures',
        'Legal Consultation (1 hour)'
      ]
    },
    {
      name: 'Business',
      price: 1299,
      featured: false,
      features: [
        'Unlimited Documents',
        'All Premium Templates',
        'Unlimited Cloud Storage',
        '24/7 Phone Support',
        'Digital Signatures',
        'Legal Consultation (5 hours)',
        'Custom Templates',
        'Team Collaboration'
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    navigate('/register', { state: { selectedPlan: plan } });
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Choose Your Plan</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '18px' }}>
        Select the perfect plan for your needs
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '50px'
      }}>
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            plan={plan}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px' }}>All plans include:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div>✓ Secure encryption</div>
          <div>✓ Mobile access</div>
          <div>✓ Regular updates</div>
          <div>✓ Money-back guarantee</div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
