import SchedulesDoctor from '@/components/views/SchedulesDoctor/';
import doctorService from '@/services/user/doctor';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Schedules() {
  const [data, setData] = useState({});
  const { id } = useRouter().query;

  const getDetailDoctor = async (id) => {
    try {
      const response = await doctorService.getDoctorById(id);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailDoctor(id);
  }, [id]);

  return (
    <>
      <Head>
        <title>RS Harapan Bunda | Schedule Doctor</title>
      </Head>
      <SchedulesDoctor
        data={data}
        doctorId={id}
      />
    </>
  );
}
