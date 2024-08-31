import { useRouter } from 'next/router';
import { Button } from '@nextui-org/react';
import CardQualifiedDoctor from '@/components/ui/Card/CardQualifiedDoctors.jsx';
import React, { useEffect, useState } from 'react';
import doctorService from '@/services/user/doctor';

export default function HomeQualifiedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  const fetchDoctors = async () => {
    try {
      const { data } = await doctorService.getDoctors();
      setDoctors(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log(doctors);

  const handleClickCheckDoctor = () => {
    router.push({
      pathname: '/find-doctor',
    });
  };

  return (
    <div className="flex flex-row-reverse max-[1070px]:flex-col justify-evenly items-center gap-4 bg-gradient-radial w-full h-max rounded-md px-1.5 my-2 py-12">
      <div className="flex flex-col justify-center max-[555px]:items-center max-[555px]:text-center">
        <h1 className="text-xl font-bold text-primary mb-3">Qualified Doctors</h1>
        <h2 className="max-[555px]:text-3xl text-6xl font-bold text-slate-800 font-sans">
          Keep doctors and <br /> loved ones in the
        </h2>
        <p className="font-semibold text-slate-600 mt-5 max-[320px]:text-xs max-[460px]:hidden">
          Security share your comprehensive medical history with <br /> doctors and loved ones, for better communication and <br /> care.
        </p>
        <Button
          className="w-max border-2 border-primary rounded-full my-4"
          onClick={handleClickCheckDoctor}
        >
          Check Doctors
        </Button>
      </div>
      <div className="flex justify-center items-center max-[575px]:w-[220px] max-[759px]:w-[500px] min-[760px]:w-[500px] h-full gap-3">
          <CardQualifiedDoctor doctors={doctors}/>
        {/* {doctors.slice(0, 3).map((doctor, index) => (
        ))} */}
      </div>
    </div>
  );
}
