import AdminLayout from '@/components/layouts/AdminLayout';
import userService from '@/services/user';
import queueActivityService from '@/services/activity/queue';
import currentDate from '@/utils/currentDate';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { GiDoctorFace } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { BiCapsule } from 'react-icons/bi';
import { UsersIcon } from 'lucide-react';
import { IoIosToday } from 'react-icons/io';

const Card = ({ icon: Icon, label, count }) => (
  <div className="flex items-center justify-center w-40 h-40 bg-blue-300 rounded-xl p-3">
    <p className="flex flex-col items-center justify-center text-sm font-semibold font-sans mt-4 text-white">
      <Icon size="30" />
      {label}: {count}
    </p>
  </div>
);

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

        const doctorCount = users.filter((user) => user.role === 'doctor').length;
        setDoctorCount(doctorCount);

        const adminCount = users.filter((user) => user.role === 'admin').length;
        setAdminCount(adminCount);

        const pharmasyCount = users.filter((user) => user.role === 'pharmacy').length;
        setPharmasyCount(pharmasyCount);

        let patientCount = 0;
        users.forEach((user) => {
          if (user.patient && Array.isArray(user.patient)) {
            patientCount += user.patient.length;
          }
        });
        setPatientCount(patientCount);

        const queueResult = await queueActivityService.getQueueActivity();
        const todayQueue = queueResult.data.data.filter((queue) => queue.bookDate === currentDate());
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
      <figure className="flex items-center bg-blue-300 w-full h-56 rounded-lg p-8 justify-center">
        <h1 className="text-6xl max-sm:text-2xl max-sm:text-center font-bold font-sans text-white">Welcome</h1>
      </figure>

      <div className="mt-10">
        <h1 className="text-xl font-bold text-blue-400 mb-2">Report</h1>

        <div className="flex flex-wrap gap-3">
          <Card
            icon={GiDoctorFace}
            label="Jumlah Dokter"
            count={doctorCount}
          />
          <Card
            icon={GrUserAdmin}
            label="Jumlah Admin"
            count={adminCount}
          />
          <Card
            icon={BiCapsule}
            label="Jumlah Pharmacy"
            count={pharmasyCount}
          />
          <Card
            icon={UsersIcon}
            label="Jumlah Pasien Terdaftar"
            count={patientCount}
          />
          <Card
            icon={IoIosToday}
            label="Jumlah Pasien Hari ini"
            count={todayQueueCount}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardView;
