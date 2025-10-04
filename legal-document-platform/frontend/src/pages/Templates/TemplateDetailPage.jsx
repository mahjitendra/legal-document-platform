import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';

const TemplateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTemplate({
        id: id,
        title: 'Rental Agreement Template',
        description: 'Standard rental agreement template for residential properties',
        category: 'rental',
        content: 'This is a sample rental agreement...'
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  const handleUseTemplate = () => {
    navigate(`/documents/create?template_id=${template.id}`);
  };

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <Button variant="secondary" onClick={() => navigate('/templates')}>
        ← Back to Templates
      </Button>

      <Card style={{ marginTop: '20px' }}>
        <h1>{template.title}</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>{template.description}</p>

        <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Preview</h3>
          <p>{template.content}</p>
        </div>

        <Button onClick={handleUseTemplate}>
          Use This Template
        </Button>
      </Card>
    </div>
  );
};

export default TemplateDetailPage;
