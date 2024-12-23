import AdminLayout from '@/components/layouts/AdminLayout';
import { useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import { Button, useDisclosure } from '@nextui-org/react';
import ModalDeleteUser from './ModalDeleteUser';
import ModalAddUser from './ModalAddUser';
import Search from '@/components/ui/Search';
import TableDoctors from './Tables/TableDoctors';
import TablePatients from './Tables/TablePatients';
import TablePharmacy from './Tables/TablePharmacy';
import TableAllUsers from './Tables/TableAllUsers';
import ButtonTab from '../Ui/ButtonTab';
import useUser from '@/hooks/useUser';

const AdminUsersView = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { users, setUsers, searchUser, setSearchUser } = useUser();
  const [updateUser, setUpdateUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [addUser, setAddUser] = useState({
    status: false,
  });

  const [selectTab, setSelectTab] = useState({
    status: true,
    type: 'all',
  });

  //function filtering data by role
  const filterByRole = (role) => {
    const result = users?.filter((user) => user.role === role);
    return result;
  };

  return (
    <>
      <AdminLayout>
        <div className="mx-4">
          <h1 className="text-2xl font-bold mb-5">Users Management</h1>
          <div className="flex items-start min-md:items-center justify-between max-md:flex-col w-full gap-3">
            <div className="relative w-3/5 text-neutral-600">
              <Search
                state={searchUser}
                setState={setSearchUser}
              />
            </div>
            <div className="w-max flex justify-end">
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
          <div className="flex justify-start items-center gap-2 mt-6">
            <ButtonTab
              type="all"
              state={selectTab}
              setState={setSelectTab}
              basicColor={'blue'}
            />
            <ButtonTab
              type="patient"
              state={selectTab}
              setState={setSelectTab}
              basicColor={'blue'}
            />
            <ButtonTab
              type="doctor"
              state={selectTab}
              setState={setSelectTab}
              basicColor={'blue'}
            />
            <ButtonTab
              type="pharmacy"
              state={selectTab}
              setState={setSelectTab}
              basicColor={'blue'}
            />
          </div>
        </div>
        {selectTab.status && selectTab.type === 'all' && (
          <TableAllUsers
            users={users}
            setUpdateUser={setUpdateUser}
            setDeleteUser={setDeleteUser}
            onOpen={onOpen}
          />
        )}
        {selectTab.status && selectTab.type === 'doctor' && (
          <TableDoctors
            filterByRole={filterByRole}
            setUpdateUser={setUpdateUser}
            setDeleteUser={setDeleteUser}
            onOpen={onOpen}
          />
        )}
        {selectTab.status && selectTab.type === 'patient' && (
          <TablePatients
            filterByRole={filterByRole}
            setUpdateUser={setUpdateUser}
            setDeleteUser={setDeleteUser}
            onOpen={onOpen}
          />
        )}
        {selectTab.status && selectTab.type === 'pharmacy' && (
          <TablePharmacy
            filterByRole={filterByRole}
            setUpdateUser={setUpdateUser}
            setDeleteUser={setDeleteUser}
            onOpen={onOpen}
          />
        )}
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
