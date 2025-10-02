import axios from '../axios.config';

const addSignature = (documentId, signatureData) => {
  return axios.post(`/signatures/${documentId}/sign`, { signature_data: signatureData });
};

const signatureService = {
  addSignature,
};

export default signatureService;