import TableUi from '@/components/ui/Table';
const { Button } = require('@nextui-org/react');

const TableAllUsers = ({ setUpdateUser, setDeleteUser, users, onOpen }) => {
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
      title: 'Role',
      uid: 'role',
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
            {data.role !== 'admin' && (
              <Button
                isIconOnly
                type="button"
                className="bx bxs-edit-alt text-blue-500 font-semibold text-[14px]"
                onPress={onOpen}
                onClick={() => setUpdateUser(data)}
              />
            )}
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
  const processedData = users.map((user, index) => ({ ...user, index }));
  return (
    <TableUi
      data={processedData}
      columns={columns}
      renderCellContent={renderCellContent}
    />
  );
};

export default TableAllUsers;
