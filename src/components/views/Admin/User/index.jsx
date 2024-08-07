import AdminLayout from '@/components/layouts/AdminLayout';
import TableUi from '@/components/ui/Table';
import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import { Button, useDisclosure } from '@nextui-org/react';
import ModalDeleteUser from './ModalDeleteUser';
import ModalAddUser from './ModalAddUser';
import Search from '@/components/ui/Search';

const AdminUsersView = ({ users, setUsers, setSearchUser, searchUser }) => {
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
        <div className="flex w-full">
          <div className="lg:w-1/5 md:w-1/4"></div>
          <div className="lg:w-4/5 md:w-3/4">
            <h1 className="text-2xl font-bold mb-5">Users Management</h1>
            <div className="flex items-center justify-between w-full">
              <div className="relative w-3/5 text-neutral-600 ml-2">
                <Search
                  state={searchUser}
                  setState={setSearchUser}
                />
              </div>
              <div className="w-2/5 flex justify-end mr-2">
                <Button
                  endContent={<i className="bx bx-plus-circle text-xl" />}
                  type="button"
                  className="text-white font-semibold text-[14px] bg-blue-500 rounded-md px-3"
                  onPress={onOpen}
                  onClick={() => setAddUser({ status: true })}
                >
                  Tambah User Baru
                </Button>
              </div>
            </div>
            <TableUi
              data={processedData}
              columns={columns}
              renderCellContent={renderCellContent}
            />
          </div>
        </div>
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
