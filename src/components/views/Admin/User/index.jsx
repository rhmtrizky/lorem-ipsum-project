import AdminLayout from '@/components/layouts/AdminLayout';
import TableUi from '@/components/ui/Table';
import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import { Button, Input, useDisclosure } from '@nextui-org/react';
import ModalDeleteUser from './ModalDeleteUser';
import ModalAddUser from './ModalAddUser';

const AdminUsersView = ({ users, setUsers, setSearchUser }) => {
  const [updateUser, setUpdateUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [addUser, setAddUser] = useState({
    status: false,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const processedData = users.map((user, index) => ({ ...user, index }));

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-5">Users Management</h1>
        <div className="flex items-center justify-between w-full">
          <div className="relative w-3/5 text-neutral-600 ml-2">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full border-2 border-neutral-300 rounded-md px-2 text-sm"
              variant="underlined"
              color="danger"
              style={{ backgroundColor: 'transparent' }}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div className="absolute top-3 right-2">
              <i className="bx bx-search text-xl" />
            </div>
          </div>
          <div className="w-2/5 flex justify-end mr-2">
            <Button
              endContent={<i className="bx bx-plus-circle text-xl" />}
              type="button"
              className="text-white font-semibold text-[14px] bg-blue-500 rounded-md px-3"
              onPress={onOpen}
              onClick={() => setAddUser({ status: true })}
            >
              Add User
            </Button>
          </div>
        </div>
        <TableUi
          data={processedData}
          columns={columns}
          renderCellContent={renderCellContent}
        />
      </AdminLayout>
      {Object.keys(updateUser).length > 0 && (
        <ModalUpdateUser
          dataUpdateUser={updateUser}
          setUpdateUser={setUpdateUser}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setUsers={setUsers}
        />
      )}
      {Object.keys(deleteUser).length > 0 && (
        <ModalDeleteUser
          dataDeleteUser={deleteUser}
          setDeleteUser={setDeleteUser}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setUsers={setUsers}
        />
      )}
      {addUser.status ? (
        <ModalAddUser
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          setUsers={setUsers}
          setAddUser={setAddUser}
        />
      ) : null}
    </>
  );
};

export default AdminUsersView;
