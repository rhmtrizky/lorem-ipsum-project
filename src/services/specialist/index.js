import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const specialistService = {
  getSpecialists: (token) => instance.get('/api/specialist', headers(token)),
  addSpecialist: (data, token) => instance.post('/api/specialist', { data }, headers(token)),
};

export default specialistService;
