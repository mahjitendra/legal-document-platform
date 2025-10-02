import React, { useState, useEffect } from 'react';
import consultationService from '../../api/services/consultationService';
import { Link } from 'react-router-dom';

const ConsultationPage = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      try {
        const response = await consultationService.getConsultations();
        setConsultations(response.data);
      } catch (err) {
        setError('Failed to fetch consultations.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Consultations</h1>
      <Link to="/consultations/book">Book New Consultation</Link>
      <ul>
        {consultations.map((c) => (
          <li key={c.id}>
            <p>Lawyer: {c.lawyer.username}</p>
            <p>Start Time: {new Date(c.start_time).toLocaleString()}</p>
            <p>Status: {c.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultationPage;