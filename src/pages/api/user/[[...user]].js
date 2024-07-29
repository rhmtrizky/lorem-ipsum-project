import { deleteData, retrieveData, updateData } from '@/libs/firebase/service';
import verify from '@/utils/verify';

export default async function handler(req, res) {
  const { user } = req.query;
  if (req.method === 'GET') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const users = await retrieveData('users');
        const data = users.map((user) => {
          delete user.password;
          return user;
        });
        res.status(200).json({ status: true, message: 'Success', data: data });
      }
    });
  } else if (req.method === 'PUT') {
    const { data } = req.body;
    let field = {
      fullname: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: '',
    };
    field.fullname = data.fullname;
    field.email = data.email;
    field.phoneNumber = data.phoneNumber;
    field.role = data.role;
    if (data.password) {
      let salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(data.password, salt);
      field.password = hashPassword;
    }
    verify(req, res, async (decoded) => {
      if (decoded && decoded.role === 'admin') {
        await updateData('users', user[0], field, (result) => {
          if (result) {
            res.status(200).json({
              status: true,
              message: 'Success',
              data: field,
            });
          } else {
            res.status(400).json({
              status: false,
              message: 'Failed Update user',
            });
          }
        });
      }
    });
  } else if (req.method === 'DELETE') {
    console.log(user);
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
