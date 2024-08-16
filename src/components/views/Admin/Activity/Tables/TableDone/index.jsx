import TableUi from '@/components/ui/Table';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { GrView } from 'react-icons/gr';

const TableDone = ({ setTicketQueue, filterByStatusActivity, onOpen, getDateForFilter }) => {
  useEffect(() => {
    if (getDateForFilter !== '') {
      filterByStatusActivity('done');
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
      title: 'Note',
      uid: 'note',
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
      case 'status': {
        return (
          <Button
            size="sm"
            className="bg-blue-500 text-white text-[12px] rounded-md font-semibold"
          >
            SELESAI
          </Button>
        );
      }
      case 'note': {
        return (
          data?.isHandle?.isTaken === false && (
            <Button
              size="sm"
              className="bg-red-500 text-white text-[12px] rounded-md font-semibold"
            >
              Obat Tidak Diambil
            </Button>
          )
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
  const processedData = filterByStatusActivity('done').map((user, index) => ({ ...user, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TableDone;
