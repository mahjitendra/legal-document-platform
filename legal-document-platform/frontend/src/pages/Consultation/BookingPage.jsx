import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import consultationService from '../../api/services/consultationService';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';

const BookingPage = () => {
  const [lawyerId, setLawyerId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await consultationService.bookConsultation(lawyerId, startTime, endTime);
      navigate('/consultations');
    } catch (err) {
      setError('Failed to book consultation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Book a Consultation</h1>
      <form onSubmit={handleBooking}>
        <Input
          type="text"
          placeholder="Lawyer ID"
          value={lawyerId}
          onChange={(e) => setLawyerId(e.target.value)}
        />
        <Input
          type="datetime-local"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Input
          type="datetime-local"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Book Now'}
        </Button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default BookingPage;