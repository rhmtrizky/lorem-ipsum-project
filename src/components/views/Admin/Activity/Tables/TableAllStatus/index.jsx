import TableUi from '@/components/ui/Table';
import { GrView } from 'react-icons/gr';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

const TableAllStatus = ({ activities, setTicketQueue, onOpen, getDateForFilter, selectTabSpecialist, filterDataFotTableAllUsers, setFilterDataFotTableAllUsers, filterByStatusActivity }) => {
  useEffect(() => {
    if (activities?.length > 0) {
      if (getDateForFilter !== '' && selectTabSpecialist?.type !== '') {
        const result = activities?.filter((activity) => activity.bookDate === getDateForFilter && activity.specialist === selectTabSpecialist?.type);
        setFilterDataFotTableAllUsers(result);
        filterByStatusActivity('');
      } else if (getDateForFilter !== '') {
        const result = activities?.filter((activity) => activity.bookDate === getDateForFilter);
        setFilterDataFotTableAllUsers(result);
        filterByStatusActivity('');
      } else if (selectTabSpecialist?.type !== '') {
        const result = activities?.filter((activity) => activity.specialist === selectTabSpecialist?.type);
        setFilterDataFotTableAllUsers(result);
        filterByStatusActivity('');
      } else {
        setFilterDataFotTableAllUsers(activities);
        filterByStatusActivity('');
      }
    }
  }, [getDateForFilter, activities, selectTabSpecialist]);

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
      title: 'Apoteker',
      uid: 'apoteker',
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
      case 'apoteker': {
        return <p>{data?.isHandle?.apoteker}</p>;
      }
      case 'status': {
        return (
          <Button
            size="sm"
            className={`bg-${data.status === 'expired' ? 'red' : 'blue'}-500 text-white text-[12px] rounded-md font-semibold`}
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

  const processedData = filterDataFotTableAllUsers?.map((queue, index) => ({ ...queue, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TableAllStatus;
