import Button from '@/components/ui/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SideBar = ({ lists, title, closeIcon, onClick, bgColor }) => {
  const { pathname } = useRouter();
  const { status } = useSession();

  return (
    <div className="lg:w-1/5 md:w-[2/5] h-screen fixed bg-blue-500 flex flex-col justify-between p-5">
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">{title}</h1>
          <button onClick={onClick}>
            <p className="text-white text-2xl">{closeIcon}</p>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-7">
          {lists.map((item, index) => (
            <Link
              href={item.url}
              key={item.title}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-neutral-900 hover:ease-in-out hover:duration-300 ${pathname == item.url && item.url !== '' ? 'bg-white text-neutral-900' : 'text-white'}`}
            >
              <i className={`bx ${item.icon} text-2xl`} />
              <h4>{item.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <Button
        label={status !== 'authenticated' ? `Log In` : `Log Out`}
        onClick={() => (status !== 'authenticated' ? signIn() : signOut())}
        className="bg-white w-full text-neutral-900 font-semibold py-2 px-3 rounded-md text-sm"
      />
    </div>
  );
};

export default SideBar;
