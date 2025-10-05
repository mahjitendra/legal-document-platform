import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create a document?',
      answer: 'You can create a document by selecting a template or starting from scratch. Navigate to the Documents section and click "Create New Document".'
    },
    {
      question: 'Are digital signatures legally valid?',
      answer: 'Yes, digital signatures created on our platform are legally valid under the IT Act, 2000 and are recognized by courts.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We use bank-grade encryption to protect your data. All documents are encrypted at rest and in transit.'
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'Yes, you can cancel your subscription anytime from your account settings. Your access will continue until the end of the billing period.'
    },
    {
      question: 'Do you provide legal consultation?',
      answer: 'Yes, we connect you with verified lawyers for consultations via video call, phone, or in-person meetings.'
    }
  ];

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Frequently Asked Questions</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Find answers to common questions about our platform
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {faqs.map((faq, index) => (
          <Card key={index} style={{ cursor: 'pointer' }} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{faq.question}</h3>
              <span style={{ fontSize: '24px' }}>{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <p style={{ marginTop: '15px', color: '#666', lineHeight: '1.6' }}>{faq.answer}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
