import { retrieveData, retrieveDataById } from '@/libs/firebase/service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pharmacyId = req.query.pharmacy;
    const users = await retrieveData('users');

    let filteredUsers = users.filter((user) => {
      if (user.role === 'pharmacy') {
        delete user.password;
        return true;
      }
      return false;
    });

    if (pharmacyId) {
      const detailPharmacy = await retrieveDataById('users', pharmacyId[0]);
      res.status(200).json({ status: true, message: 'success', data: detailPharmacy });
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
