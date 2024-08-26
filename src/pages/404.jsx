import { notFound } from '@/assets/images/images';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <Image
        src={notFound}
        alt="404"
        width={600}
        height={600}
      />
    </div>
  );
};

export default NotFoundPage;
