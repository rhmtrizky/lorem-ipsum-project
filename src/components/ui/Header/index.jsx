import { call, instagram, linkedin, logo, mail, next, twitter } from '@/assets/images/images';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoHarapanBunda from '../Logo';
import SocialMedia from '../SocialMedia';

export default function Header() {
  const session = useSession();
  const router = useRouter();

  const handleToDashboard = () => {
    router.push({
      pathname: `/patient/dashboard/account`,
    });
  };

  return (
    <header className="top-0 right-0 w-full h-[90px] shadow-md bg-white">
      <div className="flex items-center justify-between h-full px-8 min-[600px]:px-0">
        <div className="flex justify-around items-center min-[600px]:w-[25%]  ">
          <LogoHarapanBunda/>
        </div>

        <nav className="hidden min-[600px]:block w-full h-full">
          <div className="flex items-center justify-around max-[950px]:justify-center h-1/2 px-1 bg-gradient-to-r from-secondary to-primary ">
            <div className="flex gap-5 h-max">
              <div className="flex items-center gap-1">
                <Image
                  src={mail}
                  width={25}
                  height={25}
                  alt="mail.png"
                  className="w-[30px] min-[950px]:w-[20px]"
                />
                <p className="hidden min-[600px]:block text-sm text-white cursor-default">loremipsum@gmail.com</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={call}
                  width={15}
                  height={15}
                  alt="mail.png"
                />
                <p className="hidden min-[600px]:block text-sm text-white cursor-default">+62978324593</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className='hidden min-[950px]:block' >
                <SocialMedia/>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className={`h-8 ${session.status == 'authenticated' ? 'flex' : 'hidden'} justify-center items-center gap-2 border-2 border-secondary text-white w-8 rounded-full shadow-lg hover:shadow-pink-300/100`}
                onClick={handleToDashboard}
              >
                <i className="bx bxs-user  text-white"></i>
              </motion.button>
            </div>
          </div>

          <div className="w-full h-1/2 flex justify-around items-center font-bold px-6">
            <ul className="flex gap-6 text-sm text-slate-400">
              <li>
                <Link
                  href={'/findDoctor'}
                  className="hover:text-[#654AB4] transition duration-[.3s] ease-linear"
                >
                  Cari Dokter
                </Link>
              </li>
              <li>
                <Link
                  href={'/'}
                  className="hover:text-primary transition duration-[.3s] ease-linear"
                >
                  Informasi
                </Link>
              </li>
              <li>
                <Dropdown>
                  <DropdownTrigger>
                    <button className="flex items-center hover:text-primary transition duration-[.3s] ease-linear outline-none">
                      Kontak
                      <i className="bx bx-chevron-down text-lg " />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    className="bg-white shadow-xl border-t-2 border-purple-800 p-3 text-[14px]"
                  >
                    <DropdownItem>
                      <Link
                        href={'/faq'}
                        className="font-semibold text-slate-400 hover:text-primary transition duration-[.3s] ease-linear"
                      >
                        FAQ
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        href={'/flowRegisBpjs'}
                        className="font-semibold text-slate-400 hover:text-primary transition duration-[.3s] ease-linear"
                      >
                        Cara Daftar
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        href={'/feedback'}
                        className="font-semibold text-slate-400 hover:text-primary transition duration-[.3s] ease-linear"
                      >
                        Pengalaman Pelanggan
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="h-8 flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-white py-2 px-4 rounded-full shadow-lg hover:shadow-purple-500/50"
                onClick={session.status == 'authenticated' ? () => signOut() : () => signIn()}
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
          </div>
        </nav>
        <Sidebar />
      </div>
    </header>
  );
}