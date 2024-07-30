import AdminUsersView from '@/components/views/Admin/User';
import useDebounce from '@/hooks/useDebounce';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AdminUsersManagementPage = () => {
  const session = useSession();
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const { debounce } = useDebounce();

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

  const performSearch = async () => {
    if (searchUser !== '') {
      try {
        const { data } = await userService.searchUser(searchUser);
        setUsers(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      getDataUsers();
    }
  };

  const debouncedSearch = debounce(performSearch, 1000);

  useEffect(() => {
    debouncedSearch();
  }, [searchUser]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      getDataUsers();
    }
  }, [session]);

  return (
    <AdminUsersView
      users={users}
      setUsers={setUsers}
      setSearchUser={setSearchUser}
    />
  );
};

export default AdminUsersManagementPage;
