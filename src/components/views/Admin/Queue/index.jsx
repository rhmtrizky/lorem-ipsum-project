import AdminLayout from '@/components/layouts/AdminLayout';
import { Button, Input, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import ModalAddQueue from './ModalAddQueue';
import TableUi from '@/components/ui/Table';
import Search from '@/components/ui/Search';
import { GrView } from 'react-icons/gr';
import ModalTicketQueue from './ModalTicketQueue';

const QueueView = ({ users, setUsers, queues, setQueues, searchQueue, setSearchQueue }) => {
  const [addQueue, setAddQueue] = useState({ status: false });
  const [tickteQueue, setTicketQueue] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const columns = [
    {
      title: 'No.',
      uid: 'index',
    },
    {
      title: 'No Antrian',
      uid: 'queueNumber',
    },
    {
      title: 'NIK',
      uid: 'nik',
    },
    {
      title: 'Nama Pasien',
      uid: 'name',
    },
    {
      title: 'No BPJS',
      uid: 'bpjsNumber',
    },
    {
      title: 'Specialist',
      uid: 'specialist',
    },
    {
      title: 'Actions',
      uid: 'actions',
    },
  ];

  const renderCellContent = (data, columnKey) => {
    switch (columnKey) {
      case 'index': {
        return <p>{data.index + 1}</p>;
      }

      case 'phoneNumber': {
        return <p>{!data.phoneNumber ? '--' : data.phoneNumber}</p>;
      }
      case 'actions':
        return (
          <div className="flex justify-center items-center">
            <Button
              isIconOnly
              type="button"
              className="text-blue-500 font-semibold text-[14px]"
              onPress={onOpen}
              startContent={<GrView />}
              onClick={() => setTicketQueue(data)}
            />
            <Button
              isIconOnly
              type="button"
              className="bx bxs-trash text-red-500 font-semibold text-[14px]"
              onPress={onOpen}
              // onClick={() => setDeleteUser(data)}
            />
          </div>
        );
      default:
        return data[columnKey];
    }
  };

  const processedData = queues.map((queue, index) => ({ ...queue, index }));

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5">Queues Management</h1>
        <div className="flex items-center justify-between w-full">
          <div className="relative w-3/5 text-neutral-600 ml-2">
            <Search
              state={searchQueue}
              setState={setSearchQueue}
            />
          </div>
          <div className="w-2/5 flex justify-end mr-2">
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
        <TableUi
          data={processedData}
          columns={columns}
          renderCellContent={renderCellContent}
        />
      </AdminLayout>
      {addQueue.status && (
        <ModalAddQueue
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setUsers={setUsers}
          setAddQueue={setAddQueue}
          users={users}
          queues={queues}
          setQueues={setQueues}
        />
      )}
      {Object.keys(tickteQueue).length > 0 && (
        <ModalTicketQueue
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          users={users}
          tickteQueue={tickteQueue}
          setTicketQueue={setTicketQueue}
        />
      )}
    </>
  );
};

export default QueueView;
