import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../api/services/authService';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authService.register(username, password);
      setSuccess('Registered successfully. You can login now.');
      setTimeout(() => navigate('/login', { replace: true }), 750);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: 420, margin: '0 auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        {error && <div style={{ color: 'salmon' }}>{error}</div>}
        {success && <div style={{ color: 'lightgreen' }}>{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: '0.75rem' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
};

export default RegisterPage;

