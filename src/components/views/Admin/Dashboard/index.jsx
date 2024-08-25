import AdminLayout from '@/components/layouts/AdminLayout';
import userService from '@/services/user';
import queueActivityService from '@/services/activity/queue';
import currentDate from '@/utils/currentDate';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AdminDashboardView = () => {
  const [data, setData] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0); 
  const [adminCount, setAdminCount] = useState(0);
  const [pharmasyCount, setPharmasyCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [todayQueueCount, setTodayQueueCount] = useState(0);
  const { data: session } = useSession();

  const getAllData = async () => {
    if (session?.accessToken) {
      try {
        const result = await userService.getAllUsers(session.accessToken);
        const users = result.data.data;
        setData(users);

        const doctorCount = users.filter(user => user.role === 'doctor').length;
        setDoctorCount(doctorCount);

        const adminCount = users.filter(user => user.role === 'admin').length;
        setAdminCount(adminCount);

        const pharmasyCount = users.filter(user => user.role === 'pharmacy').length;
        setPharmasyCount(pharmasyCount);

        let patientCount = 0;
        users.forEach(user => {
          if (user.patient && Array.isArray(user.patient)) {
            patientCount += user.patient.length;
          }
        });
        setPatientCount(patientCount);

        const queueResult = await queueActivityService.getQueueActivity();
        const todayQueue = queueResult.data.data.filter(queue => queue.bookDate === currentDate());
        setTodayQueueCount(todayQueue.length); 

      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
  };

  useEffect(() => {
    if (session) {
      getAllData();
    }
  }, [session]);

  return (
    <AdminLayout>
      <figure className='flex items-center bg-blue-300 w-4/5 h-56 rounded-lg p-8'> 
        <div>
          <h1 className='text-6xl font-bold font-sans text-white'>Welcome</h1>
          <h2 className='text-xl font-semibold font-sans mt-4 text-white'>
            Muhammad Ghifani Ikhsan
          </h2>
        </div>
      </figure>

      <div className='mt-10'>
        <h1 className='text-xl font-bold text-blue-400 mb-2'>Report</h1>
        <div className='flex gap-3'>
          <div className='flex items-center justify-center w-40 h-40 bg-blue-300 rounded-xl p-3'>
            <p className='text-sm font-semibold font-sans mt-4 text-white'>
              Jumlah Dokter: {doctorCount}
            </p>
          </div>
          <div className='flex items-center justify-center w-40 h-40 bg-blue-300 rounded-xl p-3'>
            <p className='text-sm font-semibold font-sans mt-4 text-white'>
              Jumlah Admin: {adminCount}
            </p>
          </div>
          <div className='flex items-center justify-center w-40 h-40 bg-blue-300 rounded-xl p-3'>
            <p className='text-sm font-semibold font-sans mt-4 text-white'>
              Jumlah Pharmacy: {pharmasyCount}
            </p>
          </div>
          <div className='flex items-center justify-center w-40 h-40 bg-blue-300 rounded-xl p-3'>
            <p className='text-sm font-semibold font-sans mt-4 text-white'>
              Jumlah Pasien Terdaftar: {patientCount}
            </p>
          </div>
          <div className='flex items-center justify-center w-40 h-40 bg-blue-300 rounded-xl p-3'>
            <p className='text-sm font-semibold font-sans mt-4 text-white'>
              Jumlah Pasien Hari ini: {todayQueueCount}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardView;
