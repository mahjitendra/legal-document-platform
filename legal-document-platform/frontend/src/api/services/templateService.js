import axios from '../axios.config';

export const templateService = {
  getTemplates: async (params = {}) => {
    const response = await axios.get('/templates', { params });
    return response.data;
  },

  getTemplateById: async (templateId) => {
    const response = await axios.get(`/templates/${templateId}`);
    return response.data;
  },

  createTemplate: async (data) => {
    const response = await axios.post('/templates', data);
    return response.data;
  },

  updateTemplate: async (templateId, data) => {
    const response = await axios.put(`/templates/${templateId}`, data);
    return response.data;
  },

  deleteTemplate: async (templateId) => {
    const response = await axios.delete(`/templates/${templateId}`);
    return response.data;
  },

  useTemplate: async (templateId, data) => {
    const response = await axios.post(`/templates/${templateId}/use`, data);
    return response.data;
  },
};
