import TableUi from '@/components/ui/Table';
import { GrView } from 'react-icons/gr';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

const TableAllStatus = ({ activities, setTicketQueue, onOpen, getDateForFilter, selectTabSpecialist, filterDataFotTableAllUsers, setFilterDataFotTableAllUsers, filterByStatusActivity }) => {
  console.log(filterDataFotTableAllUsers.length);

  useEffect(() => {
    if (activities.length > 0) {
      if (getDateForFilter !== '' && selectTabSpecialist.type !== '') {
        const result = activities.filter((activity) => activity.bookDate === getDateForFilter && activity.specialist === selectTabSpecialist.type);
        setFilterDataFotTableAllUsers(result);
        filterByStatusActivity('');
      } else if (getDateForFilter !== '') {
        const result = activities.filter((activity) => activity.bookDate === getDateForFilter);
        setFilterDataFotTableAllUsers(result);
        filterByStatusActivity('');
      } else if (selectTabSpecialist.type !== '') {
        const result = activities.filter((activity) => activity.specialist === selectTabSpecialist.type);
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

  const processedData = filterDataFotTableAllUsers.map((queue, index) => ({ ...queue, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TableAllStatus;
