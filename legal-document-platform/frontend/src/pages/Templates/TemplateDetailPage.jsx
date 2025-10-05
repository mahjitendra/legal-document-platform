import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import templateService from '../../api/services/templateService';
import Button from '../../components/common/Button/Button';
// import { AuthContext } from '../../context/AuthContext';

const TemplateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { user, token } = useContext(AuthContext); // Uncomment when AuthContext is implemented
  const user = { isAdmin: true }; // Mocking admin user
  const token = 'mock_token'; // Mocking token

  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      try {
        const response = await templateService.getTemplate(id);
        setTemplate(response.data);
      } catch (err) {
        setError('Failed to fetch template.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await templateService.deleteTemplate(id, token);
        navigate('/templates');
      } catch (err) {
        setError('Failed to delete template.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!template) {
    return <div>Template not found.</div>;
  }

  return (
    <div>
      <h1>{template.name}</h1>
      <p><strong>Category:</strong> {template.category}</p>
      <p>{template.description}</p>
      <hr />
      {/* In a real app, you'd likely render the content, not just display it raw */}
      <pre>{template.content}</pre>
      <hr />
      {user && user.isAdmin && (
        <div>
          <Link to={`/templates/edit/${id}`}>
            <Button>Edit Template</Button>
          </Link>
          <Button onClick={handleDelete}>Delete Template</Button>
        </div>
      )}
    </div>
  );
};

export default TemplateDetailPage;