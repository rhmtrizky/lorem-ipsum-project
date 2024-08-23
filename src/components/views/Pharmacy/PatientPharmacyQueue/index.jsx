import { useSession } from 'next-auth/react';
import useActivity from '@/hooks/useActivity';
import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';

import PharmacyLayout from '@/components/layouts/PharmacyLayout';
import TablePatientPharmacyQueue from './Tables/TablePatientPharmacyQueue';
import ModalUpdatePatientPharmacy from './ModalUpdatePatientPharmacy';
import DataFilters from '@/components/layouts/DataFilters';

const PatientPharmacyQueueView = () => {
  const { data: session } = useSession();
  const { activities, setActivities, searchActivities, setSearchActivities } = useActivity();
  const [patients, setPatients] = useState([]);
  const [updatePatient, setUpdatePatient] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [getDateForFilter, setGetDateForFilter] = useState('');

  const getDataPatient = useCallback(() => {
    if (!activities || !session) return;

    const filteredPatients = activities.filter((item) => (!getDateForFilter || item.bookDate === getDateForFilter) && item.status === 'take medicine');

    setPatients(filteredPatients);
  }, [activities, getDateForFilter, session]);

  useEffect(() => {
    getDataPatient();
  }, [activities, session, getDataPatient]);

  return (
    <>
      <PharmacyLayout>
        <DataFilters
          searchActivities={searchActivities}
          setSearchActivities={setSearchActivities}
          getDateForFilter={getDateForFilter}
          setGetDateForFilter={setGetDateForFilter}
          patients={patients}
          setUpdatePatient={setUpdatePatient}
          onOpen={onOpen}
        />
        <TablePatientPharmacyQueue
          patients={patients}
          setUpdatePatient={setUpdatePatient}
          onOpen={onOpen}
        />
      </PharmacyLayout>
      {Object.keys(updatePatient).length > 0 && (
        <ModalUpdatePatientPharmacy
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

export default PatientPharmacyQueueView;
