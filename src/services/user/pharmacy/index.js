import instance from '@/libs/axios/instance';

const pharmacyService = {
  getAllPharmacy: () => instance.get('/api/user/pharmacy'),
  getPharmacyById: (id) => instance.get(`/api/user/pharmacy/${id}`),
};

export default pharmacyService;
