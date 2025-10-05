import axios from '../axios.config';

const getAuthHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const createDocument = (title, content, token) => {
  return axios.post('/documents', { title, content }, getAuthHeaders(token));
};

const getDocuments = (token) => {
  return axios.get('/documents', getAuthHeaders(token));
};

const getDocument = (id, token) => {
  return axios.get(`/documents/${id}`, getAuthHeaders(token));
};

const updateDocument = (id, title, content, token) => {
  return axios.put(`/documents/${id}`, { title, content }, getAuthHeaders(token));
};

const deleteDocument = (id, token) => {
  return axios.delete(`/documents/${id}`, getAuthHeaders(token));
};

const documentService = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};

export default documentService;