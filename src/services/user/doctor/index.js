import instance from '@/libs/axios/instance';

const doctorService = {
  getDoctors: () => instance.get('/api/user/doctor'),
  searchDoctor: (keyword, specialist, day) => {
    let query = `/api/user/doctor?`;

    // Cek jika keyword ada dan bukan string kosong
    if (keyword) {
      query += `search=${encodeURIComponent(keyword)}&`;
    }

    // Cek jika specialist ada dan bukan string kosong
    if (specialist) {
      query += `specialist=${encodeURIComponent(specialist)}&`;
    }

    // Cek jika day ada dan bukan string kosong
    if (day) {
      query += `day=${encodeURIComponent(day)}&`;
    }

    // Hapus '&' terakhir jika ada, untuk menghindari query yang salah
    if (query.endsWith('&')) {
      query = query.slice(0, -1);
    }

    // Jika tidak ada parameter yang ditambahkan, hapus '?' di akhir URL
    if (query === `/api/user/doctor?`) {
      query = `/api/user/doctor`;
    }

    return instance.get(query);
  },

  getDoctorById: (id) => instance.get(`/api/user/doctor/${id}`),
};

export default doctorService;
