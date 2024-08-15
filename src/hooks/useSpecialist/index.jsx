import { useEffect, useState } from 'react';
import specialistService from '@/services/specialist';
import { useSession } from 'next-auth/react';

const useSpecialist = () => {
  const { data: session } = useSession();
  const [specialists, setSpecialists] = useState([]);

  const getSpecialists = async () => {
    try {
      const result = await specialistService.getSpecialists(session.accessToken);
      if (result.status === 200) {
        setSpecialists(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      getSpecialists();
    }
  }, [session]);

  return { specialists, setSpecialists };
};

export default useSpecialist;
