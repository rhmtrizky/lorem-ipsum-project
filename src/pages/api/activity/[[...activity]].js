import { addData, retrieveData, retrieveDataById, updateData } from '@/libs/firebase/service';
import verify from '@/utils/verify';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const search = req.query.search;
        const patientActivities = await retrieveData('patientActivities');
        const patientActivityId = req.query.activity;
        console.log(patientActivityId);

        if (search) {
          const searchResult = patientActivities.filter((item) => {
            return item.name.toLowerCase().includes(search.toString().toLowerCase()) || item.nik.toLowerCase().includes(search.toLowerCase()) || item.queueNumber.toLowerCase().includes(search.toLowerCase()) || item.bpjsNumber.includes(search) || item.bookDate.includes(search);
          });
          res.status(200).json({
            status: true,
            message: 'Success',
            data: searchResult,
          });
        } else if (patientActivityId) {
          const normalizedId = patientActivityId[0].toLowerCase();
          const detailPatientActivity = patientActivities.find((activity) => activity.id.toLowerCase() === normalizedId);
          if (detailPatientActivity) {
            res.status(200).json({ status: true, message: 'success', data: detailPatientActivity });
          } else {
            res.status(404).json({ status: false, message: 'Patient activity not found' });
          }
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
        try {
          await addData('patientActivities', data, (status, result) => {
            if (status) {
              return res.status(200).json({ status: true, code: 200, message: 'Success add queue', data: { id: result.id, data } });
            } else {
              return res.status(400).json({ status: false, code: 400, message: 'Failed to add queue' });
            }
          });
        } catch (error) {
          console.log(error);
        }
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
  }
}
