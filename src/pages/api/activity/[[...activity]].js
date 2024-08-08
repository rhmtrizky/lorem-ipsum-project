import { addData, retrieveData } from '@/libs/firebase/service';
import verify from '@/utils/verify';

export default async function handler(req, res) {
  // const { user } = req.query;
  if (req.method === 'GET') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const search = req.query.search;
        const patientActivities = await retrieveData('patientActivities');
        if (search) {
          const searchResult = patientActivities.filter((item) => {
            return item.name.toLowerCase().includes(search.toString().toLowerCase()) || item.nik.toLowerCase().includes(search.toLowerCase()) || item.queueNumber.toLowerCase().includes(search.toLowerCase()) || item.bpjsNumber.includes(search);
          });
          res.status(200).json({
            status: true,
            message: 'Success',
            data: searchResult,
          });
        } else {
          const data = patientActivities.map((patientActivity) => {
            return patientActivity;
          });
          res.status(200).json({ status: true, message: 'Success', data: data });
        }
      }
    });
  } else if (req.method === 'POST') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const { data } = req.body;
        await addData('patientActivities', data, (result) => {
          if (result) {
            res.status(200).json({
              status: true,
              message: 'Success Add Queue',
              data: data,
            });
          } else {
            res.status(400).json({
              status: false,
              message: 'Failed Add Queue',
            });
          }
        });
      }
    });
    //   } else if (req.method === 'PUT') {
    //     const { data } = req.body;
    //     let field = {
    //       fullname: '',
    //       email: '',
    //       password: '',
    //       phoneNumber: '',
    //       role: '',
    //     };
    //     field.fullname = data.fullname;
    //     field.email = data.email;
    //     field.phoneNumber = data.phoneNumber;
    //     field.role = data.role;
    //     if (field.role === 'patient') {
    //       field.patient = data.patient;
    //     } else if (field.role === 'doctor') {
    //       field.specialist = data.specialist;
    //       field.licenceNumber = data.licenceNumber;
    //       field.address = data.address;
    //       field.schedule = data.schedule;
    //     } else if (field.role === 'pharmacy') {
    //       field.licenceNumber = data.licenceNumber;
    //       field.address = data.address;
    //     }
    //     if (data.password) {
    //       let salt = await bcrypt.genSalt(10);
    //       let hashPassword = await bcrypt.hash(data.password, salt);
    //       field.password = hashPassword;
    //     }
    //     verify(req, res, async (decoded) => {
    //       if (decoded && decoded.role === 'admin') {
    //         await updateData('users', user[0], field, (result) => {
    //           if (result) {
    //             res.status(200).json({
    //               status: true,
    //               message: 'Success',
    //               data: field,
    //             });
    //           } else {
    //             res.status(400).json({
    //               status: false,
    //               message: 'Failed Update user',
    //             });
    //           }
    //         });
    //       }
    //     });
  } else if (req.method === 'DELETE') {
    // console.log(user);
    // verify(req, res, async (decoded) => {
    //   if (decoded && decoded.role === 'admin') {
    //     await deleteData('users', user[0], (result) => {
    //       if (result) {
    //         res.status(200).json({
    //           status: true,
    //           message: 'Success',
    //         });
    //       } else {
    //         res.status(400).json({
    //           status: false,
    //           message: 'Failed Delete user',
    //         });
    //       }
    //     });
    //   }
    // });
  }
}
