import { addData, deleteData, retrieveData, retrieveDataById, updateData } from '@/libs/firebase/service';
import verify from '@/utils/verify';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {

  if (req.method === 'GET') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const users = await retrieveDataById('users', decoded.id);
        users.id = decoded.id
        res.status(200).json({
            status: true,
            message: 'success',
            data: users
        })
      }
    });
  } 
}
