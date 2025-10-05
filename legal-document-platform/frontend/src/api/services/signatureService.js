import axios from '../axios.config';

const getAuthHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const addSignature = (documentId, signatureData, token) => {
  return axios.post(`/signatures/${documentId}/sign`, { signature_data: signatureData }, getAuthHeaders(token));
};

const signatureService = {
  addSignature,
};

export default signatureService;