import axios from '../axios.config';

const getAuthHeaders = (token) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

const bookConsultation = (lawyerId, startTime, endTime, token) => {
  return axios.post('/consultations', {
    lawyer_id: lawyerId,
    start_time: startTime,
    end_time: endTime,
  }, getAuthHeaders(token));
};

const getConsultations = (token) => {
  return axios.get('/consultations', getAuthHeaders(token));
};

const consultationService = {
  bookConsultation,
  getConsultations,
};

export default consultationService;