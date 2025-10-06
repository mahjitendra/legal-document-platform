import React, { useState } from 'react';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Us</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Have questions? We'd love to hear from you.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <Card>
          <h3>📧 Email</h3>
          <p style={{ color: '#666' }}>support@legaldocs.com</p>
        </Card>
        <Card>
          <h3>📞 Phone</h3>
          <p style={{ color: '#666' }}>+91 1234567890</p>
        </Card>
        <Card>
          <h3>📍 Address</h3>
          <p style={{ color: '#666' }}>Mumbai, Maharashtra, India</p>
        </Card>
      </div>

      <Card>
        <h2 style={{ marginBottom: '20px' }}>Send us a message</h2>

        {submitted && (
          <div style={{
            padding: '15px',
            background: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <Button type="submit" fullWidth>
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactPage;
