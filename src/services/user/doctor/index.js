import instance from "@/libs/axios/instance";

const doctorService = {
  getDoctors: () => instance.get('/api/user/doctor'),
  searchDoctor: (keyword) => instance.get(`/api/user/doctor?search=${keyword}`),
  getDoctorById: (id) => instance.get(`/api/user/doctor/${id}`)
};

export default doctorService;
