import QueueView from '@/components/views/Admin/Queue';
import useDebounce from '@/hooks/useDebounce';
import queueService from '@/services/queue';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const QueuePage = () => {
  const [users, setUsers] = useState([]);
  const [queues, setQueues] = useState([]);
  const session = useSession();
  const [searchQueue, setSearchQueue] = useState('');
  const { debounce } = useDebounce();

  console.log(searchQueue);

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

  const getAllQueues = async () => {
    try {
      if (session.data.accessToken) {
        const queues = await queueService.getAllQueues(session.data.accessToken);
        setQueues(queues.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const performSearch = async () => {
    if (searchQueue !== '') {
      try {
        const { data } = await queueService.searchQueue(searchQueue, session.data.accessToken);
        setQueues(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      getAllQueues();
    }
  };

  const debouncedSearch = debounce(performSearch, 1000);

  useEffect(() => {
    debouncedSearch();
  }, [searchQueue]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      getDataUsers();
    }
  }, [session]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      getAllQueues();
    }
  }, [session]);

  return (
    <QueueView
      users={users}
      setUsers={setUsers}
      queues={queues}
      setQueues={setQueues}
      searchQueue={searchQueue}
      setSearchQueue={setSearchQueue}
    />
  );
};

export default QueuePage;
