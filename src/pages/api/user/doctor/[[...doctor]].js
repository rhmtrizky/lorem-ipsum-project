import { retrieveData } from '@/libs/firebase/service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const search = req.query.search;
    const users = await retrieveData('users');

    let filteredUsers = users.filter((user) => {
      if (user.role === 'doctor') {
        delete user.password;
        return true;
      }
      return false;
    });

    if (search) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.fullname.toLowerCase().includes(search.toString().toLowerCase()) || user.specialist.toLowerCase().includes(search.toString().toLowerCase());
      });
    }

    res.status(200).json({
      status: true,
      message: 'Success',
      data: filteredUsers,
    });
  } else {
    res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }
}
