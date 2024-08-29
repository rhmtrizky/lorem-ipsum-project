import { emptyData } from '@/assets/images/images';
import SkeletonLine from '@/components/ui/Skeleton/SkeletonLine';
import ModalUi from '@/components/views/Admin/Ui/Modal';
import useActivity from '@/hooks/useActivity';
import queueActivityService from '@/services/activity/queue';
import doctorService from '@/services/user/doctor';
import currentDate from '@/utils/currentDate';
import { Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ModalDetailQueue = ({ isOpen, onOpenChange, setDetailQueue, detailQueue }) => {
  const { activities } = useActivity();
  const [doctorNames, setDoctorNames] = useState({});
  const [doctorPatientCount, setDoctorPatientCount] = useState({});
  const [currentQueuePosition, setCurrentQueuePosition] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getQueueActivity = async () => {
    try {
      const { data } = await queueActivityService.getQueueActivity();
      const filteredQueue = data.data.filter((activity) => activity.specialist === detailQueue.specialist);

      // Filter for "checkup" status and today's date
      const filterCheckup = activities.filter((activity) => activity.specialist === detailQueue.specialist && activity.status === 'checkup' && activity.bookDate === currentDate());

      // Fetch doctor names, count patients for each doctor, and determine the current queue position
      const names = {};
      const patientCount = {};
      const queuePosition = {};

      for (const activity of filteredQueue) {
        if (!names[activity.doctorId]) {
          const { data: doctorData } = await doctorService.getDoctorById(activity.doctorId);
          names[activity.doctorId] = doctorData.data.fullname;
        }

        if (!patientCount[activity.doctorId]) {
          patientCount[activity.doctorId] = 0;
        }
        patientCount[activity.doctorId] += 1;
      }

      for (const activity of filterCheckup) {
        // Set queue position only if it hasn't been set already
        if (!queuePosition[activity.doctorId]) {
          queuePosition[activity.doctorId] = activity.queueNumber;
        }
      }
      setIsLoading(false);
      setDoctorNames(names);
      setDoctorPatientCount(patientCount);
      setCurrentQueuePosition(queuePosition);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQueueActivity();
  }, [detailQueue.specialist, activities]);

  // Extract unique doctors
  const uniqueDoctors = Object.keys(doctorNames);

  return (
    <ModalUi
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      setCloseModal={setDetailQueue}
      title="Informasi Antrian"
    >
      {isLoading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <div
            className="flex flex-col gap-1 items-start border-[1px] border-gray-300 p-3 mb-2"
            key={index}
          >
            <div className="w-[60%]">
              <SkeletonLine />
            </div>
            <SkeletonLine />
            <SkeletonLine />
          </div>
        ))
      ) : uniqueDoctors.length > 0 ? (
        uniqueDoctors.map((doctorId) => (
          <div
            className="flex flex-col gap-1 items-start border-[1px] border-gray-300 p-3"
            key={doctorId}
          >
            <h1 className="text-md font-semibold">{doctorNames[doctorId]}</h1>
            <div className="text-sm">
              <p>Jumlah Pasien: {doctorPatientCount[doctorId]}</p>
              <p>Sekarang Antrian Ke: {currentQueuePosition[doctorId] || 'Belum ada'}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex  flex-col items-center justify-center mb-5">
          <Image
            src={emptyData}
            alt={'...'}
            width={300}
            height={300}
          />
          <h1 className="text-md font-semibold italic text-blue-500">Belum ada antrian...</h1>
        </div>
      )}
    </ModalUi>
  );
};

export default ModalDetailQueue;
