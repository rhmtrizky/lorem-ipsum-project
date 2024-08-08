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

const ActivityView = ({ users, setUsers, activities, setActivities, searchActivities, setSearchActivities }) => {
  const [addQueue, setAddQueue] = useState({ status: false });
  const [ticketQueue, setTicketQueue] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectTab, setSelectTab] = useState({
    status: true,
    type: 'all',
  });

  //function filtering data by status activities
  const filterByStatusActivity = (activityStatus) => {
    const result = activities.filter((activity) => activity.status === activityStatus);

    return result;
  };

  useEffect(() => {
    if (Object.keys(ticketQueue).length > 0) {
      onOpen();
    }
  }, [ticketQueue]);

  return (
    <>
      <AdminLayout>
        <div className="mx-4">
          <h1 className="text-2xl font-bold mb-5">Patient Activity</h1>
          <div className="flex items-center justify-between w-full">
            <div className="relative w-3/5 text-neutral-600">
              <Search
                state={searchActivities}
                setState={setSearchActivities}
              />
            </div>
            <div className="w-2/5 flex justify-end">
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
          <div className="flex justify-start items-center gap-2 mt-6">
            <ButtonTab
              type="all"
              onClick={() => setSelectTab({ status: true, type: 'all' })}
            />
            <ButtonTab
              type="queue"
              onClick={() => setSelectTab({ status: true, type: 'queue' })}
            />
            <ButtonTab
              type="checkup"
              onClick={() => setSelectTab({ status: true, type: 'checkup' })}
            />
            {/* <ButtonTab
              type="pharmacy"
              onClick={() => setSelectTab({ status: true, type: 'pharmacy' })}
            /> */}
          </div>
        </div>
        {selectTab.status && selectTab.type === 'all' && (
          <TableAllStatus
            activities={activities}
            setTicketQueue={setTicketQueue}
            onOpen={onOpen}
          />
        )}
        {selectTab.status && selectTab.type === 'queue' && (
          <TableQueues
            filterByStatusActivity={filterByStatusActivity}
            setTicketQueue={setTicketQueue}
            onOpen={onOpen}
          />
        )}
        {selectTab.status && selectTab.type === 'checkup' && (
          <TableCheckup
            filterByStatusActivity={filterByStatusActivity}
            setTicketQueue={setTicketQueue}
            onOpen={onOpen}
          />
        )}
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
          tickteQueue={ticketQueue}
          setTicketQueue={setTicketQueue}
        />
      )}
    </>
  );
};

export default ActivityView;
