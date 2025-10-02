import axios from '../axios.config';

const bookConsultation = (lawyerId, startTime, endTime) => {
  return axios.post('/consultations', {
    lawyer_id: lawyerId,
    start_time: startTime,
    end_time: endTime,
  });
};

const getConsultations = () => {
  return axios.get('/consultations');
};

const consultationService = {
  bookConsultation,
  getConsultations,
};

export default consultationService;