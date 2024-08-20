import { useEffect, useState } from 'react';
import specialistService from '@/services/specialist';
import { useSession } from 'next-auth/react';

const useSpecialist = () => {
  const [specialists, setSpecialists] = useState([]);

  const getSpecialists = async () => {
    try {
      const result = await specialistService.getSpecialists();
      if (result.status === 200) {
        setSpecialists(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecialists();
  }, []);

  return { specialists, setSpecialists };
};

export default useSpecialist;
