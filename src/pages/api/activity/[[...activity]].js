import { addData, retrieveData, updateData } from '@/libs/firebase/service';
import verify from '@/utils/verify';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const search = req.query.search;
        const patientActivities = await retrieveData('patientActivities');
        if (search) {
          const searchResult = patientActivities.filter((item) => {
            return item.name.toLowerCase().includes(search.toString().toLowerCase()) || item.nik.toLowerCase().includes(search.toLowerCase()) || item.queueNumber.toLowerCase().includes(search.toLowerCase()) || item.bpjsNumber.includes(search) || item.bookDate.includes(search);
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
  } else if (req.method === 'PUT') {
    const { data } = req.body;

    const patientActivity = data.id;
    let field = {
      status: '',
    };
    field.status = data.status;
    console.log(field);

    verify(req, res, async (decoded) => {
      if (decoded) {
        console.log(patientActivity);
        await updateData('patientActivities', patientActivity, data, (result) => {
          console.log(result);

          if (result) {
            res.status(200).json({
              status: true,
              message: 'Success Update Activity',
              data: data,
            });
          } else {
            res.status(400).json({
              status: false,
              message: 'Failed Update Activity',
            });
          }
        });
      }
    });
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
