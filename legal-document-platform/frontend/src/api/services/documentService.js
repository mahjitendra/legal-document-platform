import axios from '../axios.config';

const createDocument = (title, content) => {
  return axios.post('/documents', { title, content });
};

const getDocuments = () => {
  return axios.get('/documents');
};

const getDocument = (id) => {
  return axios.get(`/documents/${id}`);
};

const updateDocument = (id, title, content) => {
  return axios.put(`/documents/${id}`, { title, content });
};

const deleteDocument = (id) => {
  return axios.delete(`/documents/${id}`);
};

const documentService = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};

export default documentService;