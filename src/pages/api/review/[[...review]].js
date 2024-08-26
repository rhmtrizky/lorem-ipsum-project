import { addData, retrieveData } from '@/libs/firebase/service';
import verify from '@/utils/verify';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const reviews = await retrieveData('reviews');
    const data = reviews.map((review) => {
      return review;
    });
    res.status(200).json({ status: true, message: 'Success', data: data });
  } else if (req.method === 'POST') {
    verify(req, res, async (decoded) => {
      if (decoded) {
        const { data } = req.body;
        try {
          await addData('reviews', data, (status, result) => {
            if (status) {
              return res.status(200).json({ status: true, code: 200, message: 'Success add review', data: data });
            } else {
              return res.status(400).json({ status: false, code: 400, message: 'Failed to add review' });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
