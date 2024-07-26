import { call, instagram, linkedin, logo, mail, next, twitter } from '@/assets/images/images';
import { motion } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  const session = useSession();
  return (
    <header className="fixed w-full h-[90px] shadow-md ">
      <div className="flex h-full">
        <div className="flex justify-around items-center w-[50%]  ">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ type: 'spring' }}
          >
            <Image
              src={logo}
              width={70}
              height={70}
              alt="logo.png"
            />
          </motion.div>
        </div>

        <nav className="w-full h-full">
          <div className="flex items-center justify-around h-1/2 px-12 bg-gradient-to-r from-cyan-500 to-blue-500 ">
            <div className="flex gap-5 h-max">
              <span className="flex items-center gap-1">
                <Image
                  src={mail}
                  width={20}
                  height={20}
                  alt="mail.png"
                />
                <p className="text-sm text-white">loremipsum@gmail.com</p>
              </span>
              <span className="flex items-center gap-1">
                <Image
                  src={call}
                  width={15}
                  height={15}
                  alt="mail.png"
                />
                <p className="text-sm text-white">+62978324593</p>
              </span>
            </div>

            <div className="flex gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
              >
                <Image
                  src={linkedin}
                  width={13}
                  height={13}
                  alt="linkedin.png"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
              >
                <Image
                  src={twitter}
                  width={13}
                  height={13}
                  alt="mail.png"
                />
              </motion.div>
              <motion.div
                whileHover={{ y: -4 }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full p-2 shadow-sm cursor-pointer"
              >
                <Image
                  src={instagram}
                  width={15}
                  height={15}
                  alt="instagram.png"
                />
              </motion.div>
            </div>
          </div>

          <div className="w-full h-1/2 flex justify-around items-center font-bold px-6">
            <ul className="flex gap-6 text-sm text-slate-400">
              <li>Cari Dokter</li>
              <li>Informasi</li>
              <li>Kontak</li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="h-8 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:shadow-blue-500/50"
              onClick={session.status == 'authenticated' ? () => signOut() : () => signIn()}
            >
              <p className="text-xs">{`${session.status == 'authenticated' ? 'Keluar' : 'Masuk'}`}</p>
              <div className="w-5 h-5 flex items-center justify-center bg-cyan-400 rounded-full">
                <Image
                  src={next}
                  width={15}
                  height={15}
                  alt="next.png"
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </div>
    </header>
  );
}
