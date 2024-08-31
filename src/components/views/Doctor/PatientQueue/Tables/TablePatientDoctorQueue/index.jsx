import TableUi from '@/components/ui/Table';
import { GrView } from 'react-icons/gr';
const { Button } = require('@nextui-org/react');

const TablePatientDoctorQueue = ({ patients, setUpdatePatient, onOpen }) => {
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
      title: 'Status',
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
      case 'status': {
        return (
          <Button
            size="sm"
            className={`bg-${data.status === 'expired' ? 'red-500' : data.status === 'checkup' ? 'green-500' : 'blue-500'} text-white text-[12px] rounded-md font-semibold`}
          >
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </Button>
        );
      }
      case 'actions':
        return (
          <div className="flex justify-center items-center bg-blue">
            <Button
              isIconOnly
              type="button"
              className="text-blue-500 font-semibold text-[14px]"
              onPress={onOpen}
              startContent={<GrView />}
              onClick={() => setUpdatePatient(data)}
            />
          </div>
        );
      default:
        return data[columnKey];
    }
  };
  const processedData = patients.map((user, index) => ({ ...user, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TablePatientDoctorQueue;