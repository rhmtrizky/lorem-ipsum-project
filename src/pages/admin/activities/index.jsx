import ActivityView from '@/components/views/Admin/Activity';
import useDebounce from '@/hooks/useDebounce';
import activityService from '@/services/activity';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const QueuePage = () => {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const session = useSession();
  const [searchActivities, setSearchActivities] = useState('');
  const { debounce } = useDebounce();
  console.log(activities);

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

  const getAllActivities = async () => {
    try {
      if (session.data.accessToken) {
        const activities = await activityService.getAllActivities(session.data.accessToken);
        setActivities(activities.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const performSearch = async () => {
    if (searchActivities !== '') {
      try {
        const { data } = await activityService.searchActivities(searchActivities, session.data.accessToken);
        setActivities(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      getAllActivities();
    }
  };

  const debouncedSearch = debounce(performSearch, 1000);

  console.log(activities);

  useEffect(() => {
    debouncedSearch();
  }, [searchActivities]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      getDataUsers();
    }
  }, [session]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      getAllActivities();
    }
  }, [session]);

  return (
    <ActivityView
      users={users}
      setUsers={setUsers}
      activities={activities}
      setActivities={setActivities}
      searchActivities={searchActivities}
      setSearchActivities={setSearchActivities}
    />
  );
};

export default QueuePage;
