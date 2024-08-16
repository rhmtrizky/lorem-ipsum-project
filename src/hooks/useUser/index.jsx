import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useDebounce from '../useDebounce';

const useUser = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const { debounce } = useDebounce();
  const getUsers = async () => {
    try {
      const { data } = await userService.getAllUsers(session.accessToken);
      setUsers(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const performSearch = async () => {
    if (searchUser !== '') {
      try {
        const { data } = await userService.searchUser(searchUser, session.accessToken);
        setUsers(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      getUsers();
    }
  };

  const debouncedSearch = debounce(performSearch, 500);

  useEffect(() => {
    debouncedSearch();
  }, [searchUser]);

  useEffect(() => {
    if (session?.accessToken) {
      getUsers();
    }
  }, [session]);

  return { users, setUsers, searchUser, setSearchUser, getUsers };
};

export default useUser;
