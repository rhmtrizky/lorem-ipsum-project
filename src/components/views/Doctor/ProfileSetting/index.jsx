import DoctorLayout from '@/components/layouts/DoctorLayout';
import doctorService from '@/services/user/doctor';
import { useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ProfileSettingAdmin from '@/components/ui/ProfileSettingAdmin';
import ModalUpdateProfileAdmin from '@/components/ui/Modal/ModalUpdateProfileAdmin';

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
        <ProfileSettingAdmin
          data={doctor}
          setOpenModal={setOpenModal}
          onOpen={onOpen}
          handleChangeButton={handleChangeButton}
          profile={profile}
          schedule={schedule}
        />
      </DoctorLayout>
      {Object.keys(doctor).length > 0 && (
        <ModalUpdateProfileAdmin
          setState={setDoctor}
          openModal={openModal}
          setOpenModal={setOpenModal}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          id={doctorId}
          token={token}
        />
      )}
    </>
  );
};

export default ProfileSettingView;
