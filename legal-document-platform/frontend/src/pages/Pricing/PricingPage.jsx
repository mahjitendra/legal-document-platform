import React from 'react';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';

const PricingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        '3 Documents per month',
        'Basic Templates',
        'Email Support',
        'Document Storage (100MB)'
      ]
    },
    {
      name: 'Professional',
      price: '₹999/month',
      popular: true,
      features: [
        'Unlimited Documents',
        'All Premium Templates',
        'Priority Support',
        'Digital Signatures',
        'Document Storage (5GB)',
        'Legal Consultation (1 hour/month)'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Dedicated Account Manager',
        '24/7 Phone Support',
        'Unlimited Storage',
        'Custom Templates',
        'API Access',
        'Team Collaboration'
      ]
    }
  ];

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that's right for you</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {plans.map((plan, index) => (
          <Card key={index} style={{ position: 'relative' }}>
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '20px',
                background: '#3498db',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                Popular
              </div>
            )}

            <h2 style={{ marginBottom: '10px' }}>{plan.name}</h2>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#3498db' }}>
              {plan.price}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✓ {feature}
                </li>
              ))}
            </ul>

            <Button fullWidth>
              {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
