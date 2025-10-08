import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import SearchBar from '../../components/search/SearchBar/SearchBar';

const LawyersPage = () => {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  useEffect(() => {
    const mockLawyers = [
      {
        id: 1,
        name: 'Advocate Rajesh Kumar',
        specialty: 'Property Law',
        experience: '15 years',
        rating: 4.8,
        fee: 1500,
        image: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 2,
        name: 'Advocate Priya Sharma',
        specialty: 'Family Law',
        experience: '10 years',
        rating: 4.9,
        fee: 1200,
        image: 'https://images.pexels.com/photos/5668856/pexels-photo-5668856.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 3,
        name: 'Advocate Amit Patel',
        specialty: 'Corporate Law',
        experience: '20 years',
        rating: 4.7,
        fee: 2000,
        image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 4,
        name: 'Advocate Neha Gupta',
        specialty: 'Criminal Law',
        experience: '12 years',
        rating: 4.6,
        fee: 1800,
        image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ];

    setLawyers(mockLawyers);
    setFilteredLawyers(mockLawyers);
  }, []);

  const handleSearch = (query) => {
    const filtered = lawyers.filter(lawyer =>
      lawyer.name.toLowerCase().includes(query.toLowerCase()) ||
      lawyer.specialty.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLawyers(filtered);
  };

  const filterBySpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
    if (specialty === 'all') {
      setFilteredLawyers(lawyers);
    } else {
      setFilteredLawyers(lawyers.filter(l => l.specialty === specialty));
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Find Legal Experts</h1>

      <div style={{ marginBottom: '30px' }}>
        <SearchBar onSearch={handleSearch} placeholder="Search lawyers by name or specialty..." />
      </div>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['all', 'Property Law', 'Family Law', 'Corporate Law', 'Criminal Law'].map(specialty => (
          <Button
            key={specialty}
            variant={selectedSpecialty === specialty ? 'primary' : 'secondary'}
            onClick={() => filterBySpecialty(specialty)}
          >
            {specialty === 'all' ? 'All' : specialty}
          </Button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredLawyers.map(lawyer => (
          <Card key={lawyer.id}>
            <img
              src={lawyer.image}
              alt={lawyer.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
            />
            <h3 style={{ marginBottom: '10px' }}>{lawyer.name}</h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>{lawyer.specialty}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
              <span>Experience: {lawyer.experience}</span>
              <span>⭐ {lawyer.rating}</span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2ecc71', marginBottom: '15px' }}>
              ₹{lawyer.fee}/consultation
            </div>
            <Button onClick={() => navigate(`/consultations/book?lawyer=${lawyer.id}`)} style={{ width: '100%' }}>
              Book Consultation
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LawyersPage;
