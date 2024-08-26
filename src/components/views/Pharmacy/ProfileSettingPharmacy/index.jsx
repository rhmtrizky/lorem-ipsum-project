import pharmacyService from '@/services/user/pharmacy';
import { useEffect, useState } from 'react';
import PharmacyLayout from '@/components/layouts/PharmacyLayout';
import ProfileSettingAdmin from '@/components/ui/ProfileSettingAdmin';
import { useDisclosure } from '@nextui-org/react';
import ModalUpdateProfileAdmin from '@/components/ui/Modal/ModalUpdateProfileAdmin';

const ProfileSettingPharmacyView = ({ pharmacyId, token }) => {
  const [pharmacy, setPharmacy] = useState({});
  const [openModal, setOpenModal] = useState({});
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const getPharmacyProfile = async () => {
    try {
      const { data } = await pharmacyService.getPharmacyById(pharmacyId);
      setPharmacy(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (pharmacyId) {
      getPharmacyProfile();
    }
  }, [pharmacyId]);
  return (
    <>
      <PharmacyLayout>
        <ProfileSettingAdmin
          data={pharmacy}
          setOpenModal={setOpenModal}
          onOpen={onOpen}
        />
      </PharmacyLayout>
      {Object.keys(pharmacy).length > 0 && (
        <ModalUpdateProfileAdmin
          setState={setPharmacy}
          openModal={openModal}
          setOpenModal={setOpenModal}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          id={pharmacyId}
          token={token}
        />
      )}
    </>
  );
};

export default ProfileSettingPharmacyView;
