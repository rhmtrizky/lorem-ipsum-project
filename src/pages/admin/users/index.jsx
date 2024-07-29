import AdminUsersView from '@/components/views/Admin/User';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AdminUsersManagementPage = () => {
  const session = useSession();
  const [users, setUsers] = useState([]);

  const getDataUsers = async () => {
    try {
      if (session.data.accessToken) {
        const users = await userService.getAllUsers(session.data.accessToken);
        setUsers(users.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      getDataUsers();
    }
  }, [session]);

  return (
    <AdminUsersView
      users={users}
      setUsers={setUsers}
    />
  );
};

export default AdminUsersManagementPage;
