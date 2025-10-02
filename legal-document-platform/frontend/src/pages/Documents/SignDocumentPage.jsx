import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignaturePad from '../../components/signature/SignaturePad/SignaturePad';
import signatureService from '../../api/services/signatureService';
import Button from '../../components/common/Button/Button';

const SignDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveSignature = async (signatureData) => {
    setLoading(true);
    setError('');

    try {
      await signatureService.addSignature(id, signatureData);
      navigate(`/documents/${id}`);
    } catch (err) {
      setError('Failed to save signature.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Document</h1>
      {/* In a real app, you would display the document content here */}
      <p>Please sign below:</p>
      <SignaturePad onSave={handleSaveSignature} />
      {loading && <div>Saving...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default SignDocumentPage;