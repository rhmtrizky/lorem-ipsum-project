import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import TableUi from '@/components/ui/Table';
import { useEffect, useState } from 'react';

const AdminUsersView = ({ users }) => {
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
          <div className="flex gap-2 justify-center items-center">
            <Button
              type="button"
              className="bx bxs-edit-alt text-blue-500 font-semibold text-[14px] py-2 px-3"
              // onClick={() => setUpdatedUser(data)}
            />
            <Button
              type="button"
              className="bx bxs-trash text-red-500 font-semibold text-[14px] py-2 px-3"
              // onClick={() => setDeletedUser(data)}
            />
          </div>
        );
      default:
        return data[columnKey];
    }
  };

  const processedData = users.map((user, index) => ({ ...user, index }));

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-5">Users Management</h1>
      <TableUi
        data={processedData}
        columns={columns}
        renderCellContent={renderCellContent}
      />
    </AdminLayout>
  );
};

export default AdminUsersView;
