import { addData, deleteData, retrieveData, updateData } from '@/libs/firebase/service';
import verify from '@/utils/verify';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { user } = req.query;
  if (req.method === 'GET') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const search = req.query.search;
        const users = await retrieveData('users');
        if (search) {
          const searchResult = users.filter((user) => {
            return user.fullname.toLowerCase().includes(search.toString().toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.phoneNumber.includes(search);
          });
          res.status(200).json({
            status: true,
            message: 'Success',
            data: searchResult,
          });
        } else {
          const data = users.map((user) => {
            delete user.password;
            return user;
          });
          res.status(200).json({ status: true, message: 'Success', data: data });
        }
      }
    });
  } else if (req.method === 'POST') {
    verify(req, res, async (decoded) => {
      if (decoded && decoded.role === 'admin') {
        const { data } = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        try {
          await addData('users', data, (status, result) => {
            if (status) {
              return res.status(200).json({ status: true, code: 200, message: 'Success add user', data: { id: result.id } });
            } else {
              return res.status(400).json({ status: false, code: 400, message: 'Failed to add user' });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  } else if (req.method === 'PUT') {
    verify(req, res, async (decoded) => {
      const { data } = req.body;

      if (decoded) {
        await updateData('users', user[0], data, (result) => {
          if (result) {
            res.status(200).json({ status: true, code: 200, message: 'Success', data: data });
          } else {
            res.status(400).json({ status: false, code: 400, message: 'Failed' });
          }
        });
      } else {
        res.status(401).json({ status: false, message: 'Access Denied' });
      }
    });
  } else if (req.method === 'DELETE') {
    verify(req, res, async (decoded) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('users', user[0], (result) => {
          if (result) {
            res.status(200).json({
              status: true,
              message: 'Success',
            });
          } else {
            res.status(400).json({
              status: false,
              message: 'Failed Delete user',
            });
          }
        });
      }
    });
  }
}
