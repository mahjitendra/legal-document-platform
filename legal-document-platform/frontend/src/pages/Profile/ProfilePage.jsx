import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card/Card';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Profile Settings</h1>

      <Card style={{ marginTop: '20px' }}>
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
        </form>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <h2>Account Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3498db' }}>12</div>
            <div style={{ color: '#666' }}>Total Documents</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2ecc71' }}>5</div>
            <div style={{ color: '#666' }}>Signed Documents</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f39c12' }}>3</div>
            <div style={{ color: '#666' }}>Consultations</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
