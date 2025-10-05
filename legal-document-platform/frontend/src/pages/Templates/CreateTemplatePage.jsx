import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import templateService from '../../api/services/templateService';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
// import { AuthContext } from '../../context/AuthContext';

const CreateTemplatePage = () => {
  const navigate = useNavigate();
  // const { token } = useContext(AuthContext); // Uncomment when AuthContext is implemented
  const token = 'mock_token'; // Mocking token

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await templateService.createTemplate(formData, token);
      navigate('/templates');
    } catch (err) {
      setError('Failed to create template. Please check the form and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Template</h1>
      <form onSubmit={handleCreateTemplate}>
        <Input
          type="text"
          name="name"
          placeholder="Template Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
        <textarea
          name="content"
          placeholder="Template Content (e.g., HTML, Markdown)"
          value={formData.content}
          onChange={handleChange}
          rows="15"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Template'}
        </Button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default CreateTemplatePage;