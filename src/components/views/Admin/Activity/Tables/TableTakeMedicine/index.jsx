import TableUi from '@/components/ui/Table';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { GrView } from 'react-icons/gr';

const TableTakeMedicine = ({ setTicketQueue, filterByStatusActivity, onOpen, getDateForFilter }) => {
  useEffect(() => {
    if (getDateForFilter !== '') {
      filterByStatusActivity('take medicine');
    }
  }, [getDateForFilter]);

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
      title: 'Book Date',
      uid: 'bookDate',
    },
    {
      title: 'Specialist',
      uid: 'specialist',
    },
    {
      title: 'Activity',
      uid: 'status',
    },
    {
      title: 'Status',
      uid: 'isHandle',
    },
    {
      title: 'Taken',
      uid: 'taken',
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
      case 'isHandle': {
        return (
          <>
            {data?.isHandle?.status ? (
              <Button
                size="sm"
                className="bg-green-500 text-white text-[12px] rounded-md font-semibold"
              >
                VERIFIED
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-red-500 text-white text-[12px] rounded-md font-semibold"
              >
                UNVERIFIED
              </Button>
            )}
          </>
        );
      }
      case 'taken': {
        return (
          <>
            {data.isHandle.status && (
              <Button
                size="sm"
                className={`bg-${data.isHandle.taken === 'today' ? 'blue' : 'red'}-500 text-white text-[12px] rounded-md font-semibold`}
              >
                {data.isHandle.taken !== 'waiting' ? <p>{data.isHandle.taken === 'today' ? 'Hari Ini' : 'Besok'}</p> : <p>Belum diambil</p>}
              </Button>
            )}
          </>
        );
      }
      case 'status': {
        return (
          <Button
            size="sm"
            className="bg-blue-500 text-white text-[12px] rounded-md font-semibold"
          >
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </Button>
        );
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
          </div>
        );
      default:
        return data[columnKey];
    }
  };
  const processedData = filterByStatusActivity('take medicine').map((user, index) => ({ ...user, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TableTakeMedicine;
