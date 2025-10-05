import React, { useState, useEffect, useContext } from 'react';
import templateService from '../../api/services/templateService';
import { Link } from 'react-router-dom';
// Assuming an AuthContext provides user info, including admin status
// import { AuthContext } from '../../context/AuthContext';

const TemplatesPage = () => {
  // const { user } = useContext(AuthContext); // Uncomment when AuthContext is implemented
  const user = { isAdmin: true }; // Mocking admin user for now

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await templateService.getTemplates();
        setTemplates(response.data);
      } catch (err) {
        setError('Failed to fetch templates.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Document Templates</h1>
      {user && user.isAdmin && (
        <Link to="/templates/create">Create New Template</Link>
      )}
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <Link to={`/templates/${template.id}`}>
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplatesPage;