import DoctorLayout from '@/components/layouts/DoctorLayout';
import TablePatientQueue from './Tables/TablePatientQueue';
import { useSession } from 'next-auth/react';
import useActivity from '@/hooks/useActivity';
import { useCallback, useEffect, useState } from 'react';
import ModalUpdatePatient from './ModalUpdatePatient';
import { Button, useDisclosure } from '@nextui-org/react';
import Search from '@/components/ui/Search';
import InputUi from '@/components/ui/Input';

const PatientQueueView = () => {
  const { data: session } = useSession();
  const { activities, setActivities, searchActivities, setSearchActivities } = useActivity();
  const [patients, setPatients] = useState([]);
  const [updatePatient, setUpdatePatient] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [getDateForFilter, setGetDateForFilter] = useState('');

  const getDataPatient = useCallback(() => {
    if (!activities || !session) return;

    const filteredPatients = activities.filter((item) => item.doctorId === session.user.id && (!getDateForFilter || item.bookDate === getDateForFilter) && (item.status === 'queue' || item.status === 'checkup'));

    setPatients(filteredPatients);
  }, [activities, getDateForFilter, session]);

  useEffect(() => {
    getDataPatient();
  }, [activities, session, getDataPatient]);

  return (
    <>
      <DoctorLayout>
        <div className="w-full flex flex-col gap-4">
          <div className="px-3 mt-2">
            <h1 className="text-2xl font-bold text-blue-900">Patient Queue Page</h1>
            <div className="flex items-end justify-between w-full gap-8 mt-5">
              <div className="relative w-3/5 text-neutral-600">
                <Search
                  state={searchActivities}
                  setState={setSearchActivities}
                />
              </div>
              <div className="flex flex-col w-2/5">
                <p className="text-neutral-700 text-sm">Filter by date:</p>
                <div className="flex items-center gap-2 justify-end">
                  <InputUi
                    name="date"
                    type="date"
                    defaultValue={getDateForFilter}
                    onChange={(e) => setGetDateForFilter(e.target.value)}
                    className={' border-2 border-neutral-300 rounded-md px-2 text-sm'}
                  />
                  <Button
                    type="button"
                    className="text-white font-semibold text-[12px] bg-red-500 rounded-md"
                    value={getDateForFilter}
                    onClick={() => setGetDateForFilter('')}
                    size="sm"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <TablePatientQueue
            patients={patients}
            setUpdatePatient={setUpdatePatient}
            onOpen={onOpen}
          />
        </div>
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
