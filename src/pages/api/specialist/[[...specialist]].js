import { addData, retrieveData } from '@/libs/firebase/service';
import verify from '@/utils/verify';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const specialists = await retrieveData('specialists');
    const data = specialists.map((specialist) => {
      return specialist;
    });
    res.status(200).json({ status: true, message: 'Success', data: data });
  } else if (req.method === 'POST') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const { data } = req.body;
        await addData('specialists', data, (result) => {
          if (result) {
            res.status(200).json({
              status: true,
              message: 'Success Add Specialist',
              data: data,
            });
          } else {
            res.status(400).json({
              status: false,
              message: 'Failed Add Specialist',
            });
          }
        });
      }
    });
  }
}
