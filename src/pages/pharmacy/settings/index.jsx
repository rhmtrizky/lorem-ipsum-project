import { useSession } from 'next-auth/react';
import ProfileSettingPharmacyView from '@/components/views/Pharmacy/ProfileSettingPharmacy';

const PharmacySettingPage = () => {
  const { data: session } = useSession();
  return (
    <ProfileSettingPharmacyView
      pharmacyId={session?.user?.id}
      token={session?.accessToken}
    />
  );
};

export default PharmacySettingPage;
