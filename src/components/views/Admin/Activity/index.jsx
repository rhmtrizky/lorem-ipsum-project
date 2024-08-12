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

const ActivityView = ({ users, setUsers, activities, setActivities, searchActivities, setSearchActivities }) => {
  const { data: session } = useSession();
  const [addQueue, setAddQueue] = useState({ status: false });
  const [ticketQueue, setTicketQueue] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const autoOpenModalTicket = () => {
      if (Object.keys(ticketQueue).length > 0) {
        onOpen();
      }
    };
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
    const result = activities?.filter((activity) => (activityStatus === '' || activity?.status === activityStatus) && (getDateForFilter === '' || activity?.bookDate === getDateForFilter) && (selectTabSpecialist.type === '' || activity.specialist === selectTabSpecialist.type));

    setGetActivityStatus(activityStatus || '');
    return result;
  };

  //filtering to get length every filter component
  useEffect(() => {
    if (activities?.length > 0 && getActivityStatus !== '') {
      // Get length by specialist within the filtered status
      const filteredByActivities = activities.filter((activity) => getActivityStatus === '' || (activity?.status === getActivityStatus && (getDateForFilter === '' || activity?.bookDate === getDateForFilter)));

      setSelectTab({
        ...selectTab,
        length: filteredByActivities.length,
      });

      const filteredBySpecialist = filteredByActivities.filter((activity) => selectTabSpecialist.type === '' || activity.specialist === selectTabSpecialist.type);

      setSelectTabSpecialist({
        ...selectTabSpecialist,
        length: filteredBySpecialist.length,
      });
    }
  }, [activities, getActivityStatus, selectTabSpecialist.type, getDateForFilter]);

  // function to refresh expired activities
  const handleRefresh = async () => {
    // Mengatur currentDate ke awal hari saat ini
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Filter untuk menemukan aktivitas dengan status 'queue' dan tanggal sebelum currentDate
    const result = activities.filter((activity) => {
      const activityDate = new Date(activity.bookDate);
      activityDate.setHours(0, 0, 0, 0); // Mengatur waktu activityDate ke awal hari
      return activity.status === 'queue' && activityDate < currentDate;
    });

    try {
      // Update aktivitas yang sudah kedaluwarsa satu per satu
      result.forEach(async (activity) => await activityService.updateActivity(activity.id, { id: activity.id, status: 'expired' }, session.accessToken));
    } catch (error) {
      console.error('Error updating activities:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="mx-4">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold mb-5">Patient Activity</h1>

            <Button
              type="submit"
              onClick={handleRefresh}
              className="text-white font-semibold text-sm rounded-md  bg-blue-500"
            >
              Refresh Page
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="relative w-3/5 text-neutral-600">
              <Search
                state={searchActivities}
                setState={setSearchActivities}
              />
            </div>
            <div className="w-2/5 flex justify-end">
              <div className="flex justify-end mx-4 items-center">
                <InputUi
                  name="date"
                  type="date"
                  defaultValue={getDateForFilter}
                  onChange={(e) => setGetDateForFilter(e.target.value)}
                />
                <Button
                  isIconOnly
                  type="button"
                  className="bx bx-sync text-neutral-700 font-semibold text-[24px] rounded-md pt-1"
                  onPress={onOpen}
                  value={getDateForFilter}
                  onClick={() => setGetDateForFilter('')}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <div className="relative">
                <ButtonTab
                  type=""
                  state={selectTab}
                  setState={setSelectTab}
                  basicColor={'blue'}
                />
                <p className={'flex justify-center items-center text-sm font-semibold bg-white text-green-500 absolute -top-1 -right-1 rounded-full px-2'}>{filterDataFotTableAllUsers.length}</p>
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
                type="expired"
                state={selectTab}
                setState={setSelectTab}
                basicColor={'red'}
              />
            </div>
            <Button
              endContent={<i className="bx bx-plus-circle text-xl" />}
              type="button"
              className="text-white font-semibold text-[14px] bg-blue-500 rounded-md px-3"
              onPress={onOpen}
              onClick={() => setAddQueue({ status: true })}
            >
              Tambah Antrian
            </Button>
          </div>
        </div>
        <div className="border-2 border-neutral-300 mt-3 px-2">
          <div className="flex gap-2 mt-3 w-full justify-end mr-3">
            <ButtonTab
              type=""
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
            <ButtonTab
              type="poli mata"
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
            <ButtonTab
              type="poli gigi"
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
            <ButtonTab
              type="poli umum"
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
            <ButtonTab
              type="poli anak"
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
            <ButtonTab
              type="poli jantung"
              state={selectTabSpecialist}
              setState={setSelectTabSpecialist}
              basicColor={'green'}
            />
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
          {selectTab.status && selectTab.type === 'queue' && (
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
        />
      )}
      {Object.keys(ticketQueue).length > 0 && (
        <ModalTicketQueue
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          users={users}
          ticketQueue={ticketQueue}
          setTicketQueue={setTicketQueue}
          activities={activities}
          setActivities={setActivities}
        />
      )}
    </>
  );
};

export default ActivityView;
