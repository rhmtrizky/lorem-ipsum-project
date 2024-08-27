import { emptyData, hospitalPurple, stetoskopPurple } from '@/assets/images/images';
import PatientDashboardLayout from '@/components/layouts/PatientDashboardLayout';
import QueueTicket from '@/components/ui/Form/QueueTicket';
import SkeletonDoctorCard from '@/components/ui/Skeleton/SkeletonDoctorCard';
import SkeletonTicket from '@/components/ui/Skeleton/SkeletonTicket';
import useActivity from '@/hooks/useActivity';
import useUser from '@/hooks/useUser';
import currentDate from '@/utils/currentDate';
import getDay from '@/utils/getDay';
import { Avatar, useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function AccountView() {
  const { activities } = useActivity();
  const { users } = useUser();
  const { data: session } = useSession();
  const [tickets, setTickets] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [detailTicket, setDetailTicket] = useState({});
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(true);

  // Fetches activities for the logged-in user
  const getActivity = () => {
    const filter = activities.filter((item) => item.userId === session?.user?.id);

    // Mengurutkan tiket berdasarkan bookDate, dengan tiket yang lebih awal dan tiket dengan bookDate === currentDate berada di atas
    const sortedTickets = filter.sort((a, b) => {
      const dateA = new Date(a.bookDate);
      const dateB = new Date(b.bookDate);

      if (a.bookDate === currentDate() && b.bookDate !== currentDate) {
        return -1; // tiket dengan bookDate === currentDate di atas
      } else if (a.bookDate !== currentDate() && b.bookDate === currentDate()) {
        return 1; // tiket dengan bookDate === currentDate di atas
      } else {
        return dateB - dateA; // jika bookDate sama, urutkan berdasarkan tanggal
      }
    });

    setTickets(sortedTickets);
    setLoading(false);
  };

  // Retrieves doctor details from the users list
  const getDetailDoctor = (doctorId) => {
    if (doctorDetails[doctorId]) {
      return doctorDetails[doctorId];
    }

    const doctor = users.find((user) => user.id === doctorId);
    if (doctor) {
      setDoctorDetails((prev) => ({
        ...prev,
        [doctorId]: doctor,
      }));
    }
    return doctor;
  };

  useEffect(() => {
    if (session?.user?.id) {
      setLoading(true);
      getActivity();
    }
  }, [session, activities]);

  return (
    <>
      <PatientDashboardLayout>
        <div className="flex flex-col items-start w-full">
          <h1 className="text-2xl font-bold text-slate-400 font-sans">Tiket Antrian Saya</h1>

          {loading ? (
            <div className="flex flex-col gap-2 w-full mt-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonTicket key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full mt-3">
              {tickets.length > 0 ? (
                tickets.map((ticket) => {
                  const doctor = getDetailDoctor(ticket.doctorId);
                  return (
                    <div
                      className={`w-full box-shadow ${ticket.bookDate === currentDate() ? 'bg-blue-200' : 'bg-white'} rounded-lg p-5 flex flex-col gap-3`}
                      key={ticket.id}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-sm font-semibold text-slate-600 flex flex-col gap-1">
                          <div>
                            <p className="flex gap-1 items-center">
                              <i className="bx bx-list-ol text-xl "></i> No. Antrian
                              <span className="font-bold text-white bg-blue-500 px-2 py-1 rounded">{ticket.queueNumber}</span>
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <i className="bx bxs-calendar text-xl"></i>
                            Booked at
                            <p className="text-sm text-sm font-bold">
                              {getDay(ticket.bookDate)}, {ticket.bookDate} <span className="font-bold text-blue-500">{ticket.bookDate === currentDate() && '(Hari Ini)'}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-semibold text-slate-600 flex items-center gap-1">
                            <p className="hidden sm:block">Status </p>
                            <span
                              className={`px-4 py-1 rounded-full  ${
                                ticket.status === 'queue' ? 'bg-blue-500 text-white' : ticket.status === 'preparing' ? 'bg-blue-500 text-white' : ticket.status === 'take medicine' ? 'bg-blue-500 text-white' : ticket.status === 'done' ? 'bg-green-500 text-white' : ticket.status === 'expired' ? 'bg-red-500 text-white' : ''
                              }`}
                            >
                              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="flex lg:flex-row md:flex-row sm:flex-col gap-6 flex-col justify-between items-start">
                        <div className="flex justify-start items-center gap-2">
                          <Avatar
                            src={doctor?.image || '/default-avatar.png'}
                            alt={doctor?.fullname || 'Doctor'}
                            size="lg"
                          />
                          <div className="flex flex-col items-start">
                            <p className="text-md font-semibold font-sans text-neutral-800">{doctor?.fullname || 'Loading...'}</p>
                            <div className="flex gap-2 mt-1">
                              <div className="flex gap-1">
                                <Image
                                  src={stetoskopPurple}
                                  width={12}
                                  height={12}
                                  alt="stetoskop.png"
                                />
                                <p className="text-sm">{doctor?.specialist?.charAt(0).toUpperCase() + doctor?.specialist?.slice(1) || 'Loading...'}</p>
                              </div>
                              <p className="text-sm">|</p>
                              <div className="flex gap-1">
                                <Image
                                  src={hospitalPurple}
                                  width={15}
                                  height={15}
                                  alt="hospital.png"
                                />
                                <p className="text-sm">RS Harapan Bunda</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-fit md:w-fit sm:w-full w-full">
                          <button
                            type="submit"
                            className="text-sm bg-[#654AB4] text-white py-2 px-4 rounded-lg w-full"
                            onClick={() => {
                              setDetailTicket(ticket);
                              onOpen();
                            }}
                          >
                            Detail Tiket
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-1 justify-center items-center w-full h-fit py-10 bg-white rounded-lg">
                  <Image
                    src={emptyData}
                    alt="empty-data"
                    width={400}
                    height={300}
                    className="animate-pulse"
                  />
                  <h1 className="text-lg font-bold text-[#654AB4] font-sans italic">Kamu belum punya tiket...</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </PatientDashboardLayout>

      {Object.keys(detailTicket).length > 0 && (
        <QueueTicket
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          ticket={detailTicket}
          data={doctorDetails[detailTicket.doctorId]}
          user={session?.user}
        />
      )}
    </>
  );
}
