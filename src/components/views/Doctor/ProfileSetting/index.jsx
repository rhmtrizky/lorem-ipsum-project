import { doctorCard, hospitalPurple, stetoskopPurple, userIcon } from '@/assets/images/images';
import DoctorLayout from '@/components/layouts/DoctorLayout';
import doctorService from '@/services/user/doctor';
import { Button, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ModalUpdateProfile from './ModalUpdateProfile';

const ProfileSettingView = ({ doctorId, token }) => {
  const [doctor, setDoctor] = useState({});
  const [profile, setProfile] = useState(true);
  const [schedule, setSchedule] = useState(false);
  const [openModal, setOpenModal] = useState({});
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const handleChangeButton = () => {
    setProfile(!profile);
    setSchedule(!schedule);
  };
  const getProfileDoctor = async () => {
    try {
      const { data } = await doctorService.getDoctorById(doctorId);
      setDoctor(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (doctorId) {
      getProfileDoctor();
    }
  }, [doctorId]);
  return (
    <>
      <DoctorLayout>
        <div className="w-full flex justify-center">
          <div className="w-[85%] flex flex-col ">
            <div className="doctor-profile-settings w-full h-[180px] relative bg-white">
              {doctor?.image ? (
                <Image
                  src={doctor?.image}
                  width={230}
                  height={230}
                  alt="doctor.png"
                  className="absolute rounded-full w-[180px] h-[180px] bg-gradient-to-t from-[#654AB4] to-[#FFBEBE] object-cover right-0 left-0 m-auto top-0 bottom-0 mt-20 border-4 border-white"
                />
              ) : (
                <Image
                  src={userIcon}
                  width={150}
                  height={150}
                  alt="doctor.png"
                  className="absolute rounded-full w-[180px] h-[180px] bg-gradient-to-t from-[#654AB4] to-[#FFBEBE] object-cover right-0 left-0 m-auto top-0 bottom-0 mt-20 border-4 border-white"
                />
              )}
            </div>

            <div className="bg-white w-full h-aoto flex justify-center pb-5 rounded-b-xl">
              <div className="flex flex-col items-center gap-1 w-full pt-20 mt-4">
                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    setOpenModal(doctor);
                    onOpen();
                  }}
                  className="text-white font-semibold text-sm rounded-md  bg-blue-500"
                >
                  Edit <i className="bx bxs-message-square-edit text-lg"></i>
                </Button>
                <h1 className="font-semibold text-2xl ">{doctor.fullname}</h1>
                <div className="flex items-center gap-1.5 ">
                  <Image
                    src={stetoskopPurple}
                    width={20}
                    height={20}
                    alt="stetoskop.png"
                  />
                  <p className="text-[#654AB4] cursor-default text-[16px]">{doctor?.specialist?.charAt(0).toUpperCase() + doctor?.specialist?.slice(1)}</p>
                </div>
                <div className="flex items-center gap-1.5 ">
                  <Image
                    src={hospitalPurple}
                    width={20}
                    height={20}
                    alt="hospital.png"
                  />
                  <p className="text-[#654AB4] cursor-default text-[16px]">RS.Harapan Bunda</p>
                </div>
                <div className="flex gap-2 items-center mt-4">
                  <Button
                    onClick={handleChangeButton}
                    className={`h-8 py-3 px-4 rounded-md shadow-lg text-sm font-semibold ${profile ? 'bg-gradient-to-r from-[#FFBEBE] to-[#654AB4] text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={handleChangeButton}
                    className={`h-8 py-3 px-4 rounded-md shadow-lg text-sm font-semibold ${schedule ? 'bg-gradient-to-r from-[#FFBEBE] to-[#654AB4] text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Schedule
                  </Button>
                </div>
                <div className="flex w-[50%] mt-2 h-fit rounded-lg border-[1px] border-slate-300 justify-center text-sm">
                  {schedule ? (
                    <div className="flex flex-col gap-2.5 font-light w-full p-5 ">
                      {doctor?.schedule?.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between w-full text-blue-900"
                        >
                          <p className="font-semibold">{item.day}</p>
                          <div className="flex gap-3">
                            <span>{item.startTime}</span>-<span>{item.endTime}</span>
                          </div>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5 font-light w-full p-5">
                      <li className="flex justify-between w-full text-blue-900">
                        <p className="font-semibold">Phone Number</p>
                        <div className="flex gap-3">
                          <span>{doctor?.phoneNumber}</span>
                        </div>
                      </li>
                      <li className="flex justify-between w-full text-blue-900">
                        <p className="font-semibold">Licence Number</p>
                        <div className="flex gap-3">
                          <span>{doctor?.licenceNumber}</span>
                        </div>
                      </li>
                      <li className="flex justify-between w-full text-blue-900">
                        <p className="font-semibold">Address</p>
                        <div className="flex gap-3">
                          <span>{doctor?.address}</span>
                        </div>
                      </li>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DoctorLayout>
      {Object.keys(doctor).length > 0 && (
        <ModalUpdateProfile
          doctor={doctor}
          setDoctor={setDoctor}
          openModal={openModal}
          setOpenModal={setOpenModal}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          doctorId={doctorId}
          token={token}
        />
      )}
    </>
  );
};

export default ProfileSettingView;
