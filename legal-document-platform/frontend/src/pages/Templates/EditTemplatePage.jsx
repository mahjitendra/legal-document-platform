import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import templateService from '../../api/services/templateService';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
// import { AuthContext } from '../../context/AuthContext';

const EditTemplatePage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await templateService.getTemplate(id);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch template data.');
      }
    };
    fetchTemplate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTemplate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await templateService.updateTemplate(id, formData, token);
      navigate(`/templates/${id}`);
    } catch (err) {
      setError('Failed to update template.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Template</h1>
      <form onSubmit={handleUpdateTemplate}>
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
          {loading ? 'Updating...' : 'Update Template'}
        </Button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default EditTemplatePage;