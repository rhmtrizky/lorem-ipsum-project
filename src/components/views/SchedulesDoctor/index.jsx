import { addUser, bufferBro, getTicket } from '@/assets/images/images';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CardDoctorSchedule from '@/components/ui/Card/CardDoctorSchedule';
import Header from '@/components/ui/Header';
import userService from '@/services/user';
import Image from 'next/image';
import FormQueueTicket from '@/components/ui/Form/FormQueueTicket';
import FormAddFamily from '@/components/ui/Form/FormAddFamily';
import FormAddPatient from '@/components/ui/Form/FormAddPatient';
import { Button, useDisclosure } from '@nextui-org/react';
import QueueTicket from '@/components/ui/Form/QueueTicket';

export default function SchedulesDoctor({ data, doctorId }) {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [ticket, setTicket] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (Object.keys(ticket).length > 0) {
      onOpen();
    }
  }, [ticket]);

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
    <>
      <Header />
      <section className="flex gap-3 my-8 mx-24">
        <div className="mt-12">
          <CardDoctorSchedule
            image={data?.image}
            name={data?.fullname}
            specialist={data?.specialist}
          />
          <div className="mt-4">
            <div className="w-[180px] h-[50px] flex justify-center items-center gap-2 bg-[#654AB4] shadow-lg ">
              <div className="dot"></div>
              <p className="text-white font-semibold cursor-default">JADWAL DOKTER</p>
            </div>
            <div className="bg-white border-2 border-dashed w-full h-max p-4">
              <p className="mb-4 text-lg text-semibold text-slate-600">{data?.fullname}</p>
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

        <div className="flex justify-center mt-12 ">
          <div className="bg-white w-[800px]">
            {user?.patient?.length > 0 && (
              <div
                className="flex items-center text-[#000000ab] hover:text-[#654AB4] font-normal px-8 pt-3"
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
                    <p className="text-lg text-[#654AB4] font-semibold">Silahkan login terlebih dahulu</p>
                    <Button
                      className="w-max bg-[#654AB4] hover:bg-[#4e3a8b] rounded-full py-3.5 px-5 my-4 text-white text-[12px] rubik"
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
    </>
  );
}
