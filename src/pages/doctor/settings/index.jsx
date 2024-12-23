import ProfileSettingView from '@/components/views/Doctor/ProfileSetting';
import { useSession } from 'next-auth/react';

const ProfileSettingPage = () => {
  const { data: session } = useSession();

  return (
    <ProfileSettingView
      doctorId={session?.user?.id}
      token={session?.accessToken}
    />
  );
};

export default ProfileSettingPage;
