import { retrieveData, retrieveDataById } from '@/libs/firebase/service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const search = req.query.search;
    const users = await retrieveData('users');

    const doctorId = req.query.doctor;
    const specialist = req.query.specialist; // Menambahkan parameter specialist
    const scheduleDay = req.query.day; // Menambahkan parameter hari schedule

    let filteredUsers = users.filter((user) => {
      if (user.role === 'doctor') {
        delete user.password; // Hapus password sebelum mengirim data
        return true;
      }
      return false;
    });

    // Jika doctorId ada, ambil detail dokter dengan id tersebut
    if (doctorId) {
      const detailDoctor = await retrieveDataById('users', doctorId[0]);
      res.status(200).json({ status: true, message: 'success', data: detailDoctor });
    } else {
      // Filter berdasarkan search
      if (search) {
        filteredUsers = filteredUsers.filter((user) => user.fullname.toLowerCase().includes(search.toString().toLowerCase()) || (user.specialist && user.specialist.toLowerCase().includes(search.toString().toLowerCase())));
      }

      // Filter berdasarkan specialist dan hari schedule
      if (specialist) {
        filteredUsers = filteredUsers.filter((user) => user.specialist.toLowerCase() === specialist.toString().toLowerCase());
      }

      if (scheduleDay) {
        filteredUsers = filteredUsers.filter((user) => user.schedule.some((schedule) => schedule.day.toLowerCase() === scheduleDay.toString().toLowerCase()));
      }

      res.status(200).json({
        status: true,
        message: 'Success',
        data: filteredUsers,
      });
    }
  } else {
    res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }
}
