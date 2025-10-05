import axios from '../axios.config';

const createTemplate = (templateData, token) => {
  return axios.post('/templates', templateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getTemplates = () => {
  return axios.get('/templates');
};

const getTemplate = (id) => {
  return axios.get(`/templates/${id}`);
};

const updateTemplate = (id, templateData, token) => {
  return axios.put(`/templates/${id}`, templateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteTemplate = (id, token) => {
  return axios.delete(`/templates/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const templateService = {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
};

export default templateService;