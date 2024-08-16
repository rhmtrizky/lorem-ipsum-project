import { retrieveData, retrieveDataById } from '@/libs/firebase/service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const search = req.query.search;
    const users = await retrieveData('users');

    const doctorId = req.query.doctor;

    let filteredUsers = users.filter((user) => {
      if (user.role === 'doctor') {
        delete user.password; // Hapus password sebelum mengirim data
        return true;
      }
      return false;
    });

    console.log('doctor id', doctorId)

    // Jika doctorId ada, ambil detail dokter dengan id tersebut
    if (doctorId) {
      const detailDoctor = await retrieveDataById('users', doctorId[0]);
      res.status(200).json({ status: true, message: 'success', data: detailDoctor });
    } else if (search) {
      // Filter berdasarkan search
      const responseData = filteredUsers.filter((user) => 
        user.fullname.toLowerCase().includes(search.toString().toLowerCase()) || 
        (user.specialist && user.specialist.toLowerCase().includes(search.toString().toLowerCase()))
      );
      res.status(200).json({ status: true, message: 'Success', data: responseData });
    } else {
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
