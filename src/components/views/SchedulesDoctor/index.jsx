import { addUser, bufferBro } from '@/assets/images/images';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CardDoctorSchedule from '@/components/ui/Card/CardDoctorSchedule';
import userService from '@/services/user';
import Image from 'next/image';
import FormQueueTicket from '@/components/ui/Form/FormQueueTicket';
import FormAddFamily from '@/components/ui/Form/FormAddFamily';
import FormAddPatient from '@/components/ui/Form/FormAddPatient';
import { Button, useDisclosure } from '@nextui-org/react';
import QueueTicket from '@/components/ui/Form/QueueTicket';
import useActivity from '@/hooks/useActivity';
import currentDate from '@/utils/currentDate';

export default function SchedulesDoctor({ data, doctorId }) {
  const { data: session } = useSession();
  const { activities } = useActivity();
  const [user, setUser] = useState({});
  const [ticket, setTicket] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [queuePasient, setQueuePasient] = useState(null);

  useEffect(() => {
    if (Object.keys(ticket).length > 0) {
      onOpen();
    }
  }, [ticket]);

  useEffect(() => {
    const formattedCurrentDate = currentDate();

    const filter = activities.filter((item) => {
      // Mengubah item.bookDate menjadi format tanggal yang sama (jika bookDate adalah string)
      const formattedBookDate = new Date(item.bookDate).toISOString().split('T')[0];
      return item.doctorId === doctorId && item.status === 'queue' && formattedBookDate === formattedCurrentDate;
    });
    setQueuePasient(filter.length);
  }, [activities, doctorId]);

  const getDetailUser = async () => {
    try {
      const response = await userService.detailUser(session.accessToken);
      setUser(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetailUser();
  }, [session]);

  return (
    <div className="w-full lg:px-6 md:px-6 sm:px-3 px-3">
      <section className="flex lg:flex-row md:flex-row sm:flex-col flex-col gap-3 my-8 justify-center items-start w-full">
        <div className="lg:w-1/3 md:w-1/3 sm:w-full w-full">
          <div className="flex justify-center items-center w-full">
            <CardDoctorSchedule
              image={data?.image}
              name={data?.fullname || 'Loading..'}
              specialist={data?.specialist || 'Loading..'}
              queuePasient={queuePasient}
            />
          </div>
          <div className="mt-4">
            <div className="w-[160px] h-[40px] flex justify-center items-center gap-2 bg-primary shadow-lg rounded-t-lg">
              <div className="dot"></div>
              <p className="text-white font-semibold cursor-default text-[13px]">JADWAL DOKTER</p>
            </div>
            <div className="bg-white w-full h-max p-4 rounded-b-lg">
              <p className="mb-4 text-md text-semibold text-slate-600">{data?.fullname || 'Loading..'}</p>
              <div className="flex flex-col gap-2.5 font-light">
                {data?.schedule?.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between"
                  >
                    {item.day}
                    <div className="flex gap-3">
                      <span>{item.startTime}</span>-<span>{item.endTime}</span>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:w-2/3 md:w-2/3 sm:w-full w-full rounded-lg">
          <div className="bg-white w-full rounded-lg">
            {user?.patient?.length > 0 && (
              <div
                className="flex items-center text-[#000000ab] hover:text-primary font-normal px-8 pt-3"
                style={{ transition: '.3s ease' }}
              >
                <Image
                  src={addUser}
                  width={20}
                  height={25}
                  alt="..."
                />
                <FormAddFamily
                  user={user}
                  setUser={setUser}
                />
              </div>
            )}

            {session?.accessToken && (
              <div className="px-8 my-4">
                <hr />
              </div>
            )}

            <div className="flex flex-col items-center pt-5">
              <div className="flex flex-col items-center">
                {session?.accessToken ? (
                  <div className="flex flex-col items-center">
                    {user?.patient?.length > 0 ? (
                      <>
                        <p>Silahkan ambil tiket antrian</p>
                        <FormQueueTicket
                          data={data}
                          user={user}
                          doctorId={doctorId}
                          setTicket={setTicket}
                        />
                      </>
                    ) : (
                      <>
                        <p>Silahkan lengkapi profil Anda terlebih dahulu</p>
                        <FormAddPatient
                          user={user}
                          setUser={setUser}
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-lg text-primary font-semibold">Silahkan login terlebih dahulu</p>
                    <Button
                      className="w-max bg-primary hover:bg-[#4e3a8b] rounded-full py-3.5 px-5 my-4 text-white text-[12px] rubik"
                      onClick={() => signIn()}
                    >
                      Login
                    </Button>
                  </>
                )}

                <Image
                  src={bufferBro}
                  width={400}
                  height={400}
                  alt="buffer-bro.png"
                  className="border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {Object.keys(ticket).length > 0 && (
        <QueueTicket
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          ticket={ticket}
          data={data}
          user={user}
        />
      )}
    </div>
  );
}
