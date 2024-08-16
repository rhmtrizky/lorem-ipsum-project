import TableUi from '@/components/ui/Table';
import { Button } from '@nextui-org/react';

const TableDoctors = ({ setUpdateUser, setDeleteUser, filterByRole, onOpen }) => {
  const columns = [
    {
      title: 'No.',
      uid: 'index',
    },
    {
      title: 'Fullname',
      uid: 'fullname',
    },
    {
      title: 'Email',
      uid: 'email',
    },
    {
      title: 'Phone Number',
      uid: 'phoneNumber',
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
          <div className="flex justify-center items-center bg-blue">
            <Button
              isIconOnly
              type="button"
              className="bx bxs-edit-alt text-blue-500 font-semibold text-[14px]"
              onPress={onOpen}
              onClick={() => setUpdateUser(data)}
            />
            <Button
              isIconOnly
              type="button"
              className="bx bxs-trash text-red-500 font-semibold text-[14px]"
              onPress={onOpen}
              onClick={() => setDeleteUser(data)}
            />
          </div>
        );
      default:
        return data[columnKey];
    }
  };
  const processedData = filterByRole('doctor').map((user, index) => ({ ...user, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TableDoctors;
