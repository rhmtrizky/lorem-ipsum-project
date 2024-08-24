import AdminLayout from '@/components/layouts/AdminLayout';
import { Button, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ModalAddQueue from './ModalAddQueue';
import Search from '@/components/ui/Search';
import ModalTicketQueue from './ModalTicketQueue';
import TableAllStatus from './Tables/TableAllStatus';
import ButtonTab from '../Ui/ButtonTab';
import TableQueues from './Tables/TableQueues';
import TableCheckup from './Tables/TableCheckup';
import InputUi from '@/components/ui/Input';
import TablePrepare from './Tables/TablePrepare';
import TableTakeMedicine from './Tables/TableTakeMedicine';
import activityService from '@/services/activity';
import { useSession } from 'next-auth/react';
import TableExpired from './Tables/TableExpired';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import useActivity from '@/hooks/useActivity';
import useSpecialist from '@/hooks/useSpecialist';
import TableDone from './Tables/TableDone';
import ModalCameraScanner from './ModalCameraScanner';

const ActivityView = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { users, setUsers } = useUser();
  const { activities, setActivities, searchActivities, setSearchActivities } = useActivity();
  const { specialists } = useSpecialist();
  const [addQueue, setAddQueue] = useState({ status: false });
  const [ticketQueue, setTicketQueue] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [camera, setCamera] = useState({ status: false });

  useEffect(() => {
    if (Object.keys(ticketQueue).length > 0) {
      onOpen();
    }
  }, [ticketQueue]);

  const [selectTab, setSelectTab] = useState({
    status: true,
    type: '',
    length: 0,
  });

  const [selectTabSpecialist, setSelectTabSpecialist] = useState({
    status: true,
    type: '',
    length: 0,
  });

  // state for filter by date
  const [getDateForFilter, setGetDateForFilter] = useState('');
  const [getActivityStatus, setGetActivityStatus] = useState('');
  const [filterDataFotTableAllUsers, setFilterDataFotTableAllUsers] = useState(activities || []);

  //function filtering data by status activities
  const filterByStatusActivity = (activityStatus) => {
    const result = activities?.filter((activity) => (activityStatus === '' || activity?.status === activityStatus) && (getDateForFilter === '' || activity?.bookDate === getDateForFilter) && (selectTabSpecialist?.type === '' || activity.specialist === selectTabSpecialist?.type));

    setGetActivityStatus(activityStatus || '');
    return result;
  };

  //filtering to get length every filter component
  useEffect(() => {
    if (activities?.length > 0 && getActivityStatus !== '') {
      // Get length by specialist within the filtered status
      const filteredByActivities = activities?.filter((activity) => getActivityStatus === '' || (activity?.status === getActivityStatus && (getDateForFilter === '' || activity?.bookDate === getDateForFilter)));

      setSelectTab({
        ...selectTab,
        length: filteredByActivities.length,
      });

      const filteredBySpecialist = filteredByActivities?.filter((activity) => selectTabSpecialist?.type === '' || activity.specialist === selectTabSpecialist?.type);

      setSelectTabSpecialist({
        ...selectTabSpecialist,
        length: filteredBySpecialist.length,
      });
    }
  }, [activities, getActivityStatus, selectTabSpecialist?.type, getDateForFilter]);

  // function to refresh expired activities
  const handleRefresh = async (e) => {
    e.preventDefault();
    // Mengatur currentDate ke awal hari saat ini
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Filter untuk menemukan aktivitas dengan status 'queue' dan tanggal sebelum currentDate
    const result = activities?.filter((activity) => {
      const activityDate = new Date(activity.bookDate);
      activityDate.setHours(0, 0, 0, 0); // Mengatur waktu activityDate ke awal hari
      return activity.status === 'queue' && activityDate < currentDate;
    });

    if (result.length > 0) {
      // Update aktivitas yang sudah kedaluwarsa satu per satu
      result.forEach(async (activity) => await activityService.updateActivity(activity.id, { id: activity.id, status: 'expired' }, session?.accessToken));
      router.reload();
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold mb-5 text-blue-900">Patient Activity</h1>
            <Button
              onClick={() => {
                setCamera({ status: true });
                onOpenChange(true);
              }}
              className="text-blue-900 font-semibold text-sm rounded-md border-[1px] border-blue-500"
            >
              Scanner<i className="bx bxs-camera text-xl"></i>
            </Button>
          </div>
          <div className="flex max-md:flex-col items-start min-md:items-center justify-between gap-2 w-full">
            <div className="relative w-3/5 text-neutral-600">
              <Search
                state={searchActivities}
                setState={setSearchActivities}
              />
            </div>
            <div className="w-2/5 flex justify-end">
              <Button
                type="submit"
                onClick={handleRefresh}
                className="text-white font-semibold text-sm rounded-md  bg-blue-500"
              >
                Refresh Page <i className="bx bx-sync text-xl"></i>
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start mt-6 gap-3">
            <div className="flex min-[700px]:items-center justify-between w-full max-[700px]:flex-col items-start ">
              <div className="relative w-2/5 text-neutral-600">
                <Button
                  endContent={<i className="bx bx-plus-circle text-xl" />}
                  type="button"
                  className="text-white font-semibold text-[14px] bg-green-500 rounded-md px-3"
                  onPress={onOpen}
                  onClick={() => setAddQueue({ status: true })}
                >
                  Tambah Antrian
                </Button>
              </div>
              <div className="w-full flex justify-end max-md:mt-6">
                <div className="flex justify-end items-end gap-1">
                  <div className='flex items-center max-[700px]:flex-col  max-[700px]:justify-center' >
                    <p className="text-neutral-700 text-sm">Filter by date:</p>
                    <InputUi
                      name="date"
                      type="date"
                      defaultValue={getDateForFilter}
                      onChange={(e) => setGetDateForFilter(e.target.value)}
                      className={' border-2 border-neutral-300 rounded-md px-2 text-sm'}
                    />
                  </div>
                  <Button
                    type="button"
                    className="text-white font-semibold text-[12px] bg-red-500 rounded-md mb-1"
                    value={getDateForFilter}
                    onClick={() => setGetDateForFilter('')}
                    size="sm"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 w-full justify-start overflow-x-auto w-auto scrollbar-hide">
              <div className="relative">
                <ButtonTab
                  type=""
                  state={selectTab}
                  setState={setSelectTab}
                  basicColor={'blue'}
                />
                <p className={'flex justify-center items-center text-sm font-semibold bg-white text-green-500 absolute -top-1 -right-1 rounded-full px-2'}>{filterDataFotTableAllUsers?.length}</p>
              </div>
              <ButtonTab
                type="queue"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'blue'}
              />
              <ButtonTab
                type="preparing"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'blue'}
              />
              <ButtonTab
                type="checkup"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'blue'}
              />
              <ButtonTab
                type="take medicine"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'blue'}
              />
              <ButtonTab
                type="done"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'blue'}
              />
              <ButtonTab
                type="expired"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'red'}
              />
              <ButtonTab
                type="history"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'blue'}
              />
            </div>
          </div>
        </div>
        <div className="border-2 border-neutral-300 mt-3 w-full">
          <div className="flex gap-2 mt-3 w-full justify-start overflow-x-auto w-auto py-2 px-2 scrollbar-hide">
            <ButtonTab
              type=""
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
            {specialists?.map((specialist) => (
              <div key={specialist.specialistName}>
                <ButtonTab
                  type={specialist.specialistName}
                  state={selectTabSpecialist}
                  setState={setSelectTabSpecialist}
                  basicColor={'green'}
                />
              </div>
            ))}
          </div>
          {selectTab.status && selectTab.type === '' && (
            <TableAllStatus
              activities={activities}
              getDateForFilter={getDateForFilter}
              selectTabSpecialist={selectTabSpecialist}
              setTicketQueue={setTicketQueue}
              onOpen={onOpen}
              filterDataFotTableAllUsers={filterDataFotTableAllUsers}
              setFilterDataFotTableAllUsers={setFilterDataFotTableAllUsers}
              filterByStatusActivity={filterByStatusActivity}
            />
          )}
          {selectTab?.status && selectTab?.type === 'queue' && (
            <div className="flex flex-col">
              <TableQueues
                filterByStatusActivity={filterByStatusActivity}
                setTicketQueue={setTicketQueue}
                onOpen={onOpen}
                getDateForFilter={getDateForFilter}
              />
            </div>
          )}
          {selectTab.status && selectTab.type === 'checkup' && (
            <TableCheckup
              filterByStatusActivity={filterByStatusActivity}
              setTicketQueue={setTicketQueue}
              onOpen={onOpen}
            />
          )}
          {selectTab.status && selectTab.type === 'preparing' && (
            <TablePrepare
              filterByStatusActivity={filterByStatusActivity}
              setTicketQueue={setTicketQueue}
              onOpen={onOpen}
            />
          )}
          {selectTab.status && selectTab.type === 'take medicine' && (
            <TableTakeMedicine
              filterByStatusActivity={filterByStatusActivity}
              setTicketQueue={setTicketQueue}
              onOpen={onOpen}
            />
          )}
          {selectTab.status && selectTab.type === 'done' && (
            <TableDone
              filterByStatusActivity={filterByStatusActivity}
              setTicketQueue={setTicketQueue}
              onOpen={onOpen}
            />
          )}
          {selectTab.status && selectTab.type === 'expired' && (
            <TableExpired
              filterByStatusActivity={filterByStatusActivity}
              setTicketQueue={setTicketQueue}
              onOpen={onOpen}
            />
          )}
        </div>
      </AdminLayout>
      {addQueue.status && (
        <ModalAddQueue
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setUsers={setUsers}
          setAddQueue={setAddQueue}
          users={users}
          activities={activities}
          setActivities={setActivities}
          setTicketQueue={setTicketQueue}
          specialists={specialists}
        />
      )}
      {Object.keys(ticketQueue).length > 0 && (
        <ModalTicketQueue
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          users={users}
          ticketQueue={ticketQueue}
          setTicketQueue={setTicketQueue}
          setActivities={setActivities}
        />
      )}
      {camera.status && (
        <ModalCameraScanner
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setTicketQueue={setTicketQueue}
          setCamera={setCamera}
        />
      )}
    </>
  );
};

export default ActivityView;
