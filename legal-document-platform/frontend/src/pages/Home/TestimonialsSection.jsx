import React from 'react';
import Card from '../../components/common/Card/Card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Small Business Owner',
      image: '👨‍💼',
      text: 'This platform made creating rental agreements so easy. Saved me time and money on legal fees.'
    },
    {
      name: 'Priya Sharma',
      role: 'Freelancer',
      image: '👩‍💻',
      text: 'The NDA templates are perfect for my client contracts. Professional and legally sound.'
    },
    {
      name: 'Amit Patel',
      role: 'Startup Founder',
      image: '👨‍🚀',
      text: 'Digital signatures and document management in one place. Exactly what we needed!'
    }
  ];

  return (
    <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '20px' }}>
          What Our Users Say
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '18px' }}>
          Trusted by thousands of satisfied customers
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>{testimonial.image}</div>
              <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                "{testimonial.text}"
              </p>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{testimonial.name}</div>
                <div style={{ color: '#999', fontSize: '14px' }}>{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
