import { useEffect, useState } from 'react';
import useDebounce from '../useDebounce';
import { useSession } from 'next-auth/react';
import activityService from '@/services/activity';

const useActivity = () => {
  const [activities, setActivities] = useState([]);
  const [searchActivities, setSearchActivities] = useState('');
  const { debounce } = useDebounce();
  const session = useSession();
  const getAllActivities = async () => {
    try {
      if (session.data.accessToken) {
        const activities = await activityService.getAllActivities(session?.data?.accessToken);
        setActivities(activities.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const performSearch = async () => {
    if (searchActivities !== '') {
      try {
        const { data } = await activityService.searchActivities(searchActivities, session?.data?.accessToken);
        setActivities(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      getAllActivities();
    }
  };

  const debouncedSearch = debounce(performSearch, 500);

  useEffect(() => {
    debouncedSearch();
  }, [searchActivities]);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      getAllActivities();
    }
  }, [session]);
  return {
    activities,
    setActivities,
    searchActivities,
    setSearchActivities,
  };
};

export default useActivity;
