import DoctorLayout from '@/components/layouts/DoctorLayout';
import { useSession } from 'next-auth/react';
import useActivity from '@/hooks/useActivity';
import { useCallback, useEffect, useState } from 'react';
import TablePatientDoctorQueue from './Tables/TablePatientDoctorQueue';
import DataFilters from '@/components/layouts/DataFilters';
import { useDisclosure } from '@nextui-org/react';
import ModalUpdatePatient from './ModalUpdatePatient';

const PatientQueueView = () => {
  const { data: session } = useSession();
  const { activities, setActivities, searchActivities, setSearchActivities } = useActivity();
  const [patients, setPatients] = useState([]);
  const [updatePatient, setUpdatePatient] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [getDateForFilter, setGetDateForFilter] = useState('');

  const getDataPatient = useCallback(() => {
    if (!activities || !session) return;

    const filteredPatients = activities.filter((item) => item.doctorId === session.user.id && (!getDateForFilter || item.bookDate === getDateForFilter) && (item.status === 'queue' || item.status === 'checkup' || item.status === 'preparing'));

    setPatients(filteredPatients);
  }, [activities, session, getDateForFilter]);

  useEffect(() => {
    getDataPatient();
  }, [getDataPatient]);

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
        />
        <TablePatientDoctorQueue
          patients={patients}
          setUpdatePatient={setUpdatePatient}
          onOpen={onOpen}
        />
      </DoctorLayout>
      {Object.keys(updatePatient).length > 0 && (
        <ModalUpdatePatient
          updatePatient={updatePatient}
          setUpdatePatient={setUpdatePatient}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          doctorName={session.user.fullname}
          setActivities={setActivities}
        />
      )}
    </>
  );
};

export default PatientQueueView;
