import { framerButton, framerSidebarBackground, framerSidebarPanel, framerText } from './framer';
import { useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';
import { AiOutlineRollback } from 'react-icons/ai';
import { logo, next } from '@/assets/images/images';
import { items } from '@/utils/datas';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const Sidebar = () => {
  const session = useSession();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));
  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <div className="min-[600px]:hidden">
      <button
        onClick={toggleSidebar}
        className="p-3 border-2 bg-white shadow-lg rounded-md"
        aria-label="toggle sidebar"
      >
        <GiHamburgerMenu />
      </button>
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm "
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 bottom-0 left-0 z-50 w-full h-full max-w-xs border-r-2 bg-white"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex items-center justify-between p-5 border-b-2  border-slate-400">
                <motion.div
                  whileInView={{ rotate: 180 }}
                  exit={{ rotate: -180 }}
                >
                  <Image
                    src={logo}
                    width={50}
                    height={50}
                    alt="logo.png"
                  />
                </motion.div>
                <motion.button
                  {...framerButton}
                  onClick={toggleSidebar}
                  className="p-3 border-2 text-black rounded-xl"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </motion.button>
              </div>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item;
                  return (
                    <li key={title}>
                      <a
                        onClick={toggleSidebar}
                        href={href}
                        className="flex flex-col items-center gap-5 transition-all m-5 hover:text-white"
                      >
                        {idx < 2 && (
                          <motion.div
                            {...framerText(idx)}
                            className="w-full flex justify-between text-center border-purple-900 border-2 hover:bg-[#654ab4a8] p-3 rounded-xl"
                          >
                            <span>{title}</span>
                            <Icon className="text-2xl" />
                          </motion.div>
                        )}
                        {
                          idx == 2 ? (
                            <motion.div
                              {...framerText(idx)}
                              className="group relative w-full hover:h-30 hover:transition-all hover:duration-1000 ease-linear text-center border-purple-900 border-2 p-3 rounded-xl"
                              whileHover={{ backgroundColor: '#654ab4a8' }} // Change background color on hover
                            >
                              <div className="flex justify-between items-center">
                                <span>{title}</span>
                                <Icon className="text-2xl" />
                              </div>
                              <motion.div
                                className="hidden group-hover:flex flex-col items-start mt-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Link href={'/faq'}>+ FAQ</Link>
                                <Link href={'/flowRegisBpjs'}>+ Cara Daftar</Link>
                              </motion.div>
                            </motion.div>
                          ) : null
                        }
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="h-fit flex items-start">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  {...framerButton}
                  className="m-5 h-8 flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50"
                  onClick={session.status == 'authenticated' ? () => signOut() : () => signIn()}
                  aria-label="masuk"
                >
                  <p className="text-xs">{`${session.status == 'authenticated' ? 'Keluar' : 'Masuk'}`}</p>
                  <div className="w-5 h-5 flex items-center justify-center bg-secondary rounded-full">
                    <Image
                      src={next}
                      width={15}
                      height={15}
                      alt="next.png"
                    />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
