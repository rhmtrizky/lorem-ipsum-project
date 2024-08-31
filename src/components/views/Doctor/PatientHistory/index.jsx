import useActivity from '@/hooks/useActivity';
import { useCallback, useEffect, useState } from 'react';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import { useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import TablePatientHistory from './Tables/TablePatientHistory';
import ModalDetailPatient from './ModalDetailPatient';
import DataFilters from '@/components/layouts/DataFilters';

const PatientHistoryView = () => {
  const { data: session } = useSession();
  const { activities, searchActivities, setSearchActivities } = useActivity();
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [getDateForFilter, setGetDateForFilter] = useState('');

  const getDataPatient = useCallback(() => {
    if (!activities || !session) return;

    const filteredPatients = activities.filter((item) => item.doctorId === session.user.id && (!getDateForFilter || item.bookDate === getDateForFilter) && item.status !== 'queue' && item.status !== 'checkup' && item.status && 'preparing');

    setPatients(filteredPatients);
  }, [activities, getDateForFilter, session]);

  useEffect(() => {
    getDataPatient();
  }, [activities, session, getDataPatient]);
  return (
    <>
      <DoctorLayout>
        <DataFilters
          searchActivities={searchActivities}
          setSearchActivities={setSearchActivities}
          getDateForFilter={getDateForFilter}
          setGetDateForFilter={setGetDateForFilter}
          patients={patients}
          onOpen={onOpen}
          title={'Patient History'}
        />
        <TablePatientHistory
          patients={patients}
          onOpen={onOpen}
          setOpenModal={setOpenModal}
        />
      </DoctorLayout>
      {Object.keys(openModal).length > 0 && (
        <ModalDetailPatient
          isOpen={isOpen}
          doctorName={session.user.fullname}
          onOpenChange={onOpenChange}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default PatientHistoryView;
