import { retrieveData } from '@/libs/firebase/service';
import currentDate from '@/utils/currentDate';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const activities = await retrieveData('patientActivities');

    let filteredQueue = activities.filter((activity) => {
      return activity.status === 'queue' && activity.bookDate === currentDate();
    });
    res.status(200).json({ status: true, message: 'success', data: filteredQueue });
  } else {
    res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }
}
