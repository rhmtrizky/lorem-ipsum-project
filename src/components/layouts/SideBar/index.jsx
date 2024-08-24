import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const SideBar = ({ lists, title, closeIcon, onClick, isOpen }) => {
  const variants = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      },
      display: "flex"
    },
    hide: {
      opacity: 0,
      x: -400,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      },
      transitionEnd: {
        display: "none"
      }
    }
  };

  const { pathname } = useRouter();
  const { status } = useSession();

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "show" : "hide"} 
      variants={variants}
      className="lg:w-1/5 md:w-[2/5] h-full fixed bg-blue-500 flex flex-col justify-between top-0 p-5 z-10"
    >
      <div className="">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">{title}</h1>
          <button onClick={onClick}>
            <p className="text-white text-2xl">{closeIcon}</p>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-7">
          {lists.map((item) => (
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
    </motion.div>
  );
};

export default SideBar;
