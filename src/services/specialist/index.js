import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const specialistService = {
  getSpecialists: () => instance.get('/api/specialist'),
  addSpecialist: (data, token) => instance.post('/api/specialist', { data }, headers(token)),
};

export default specialistService;
