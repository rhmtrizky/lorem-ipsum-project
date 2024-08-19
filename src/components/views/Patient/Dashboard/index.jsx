import { animateDoctor, injectionNotes, injectionPink, purpleFluid } from '@/assets/images/images';
import Header from '@/components/ui/Header';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardPatient() {
  return (
    <section className="px-12 py-4 ">
      <div className="relative w-full h-80 bg-purple-900 rounded-xl overflow-hidden ">
        <div className="absolute -top-12">
          <Image
            src={animateDoctor}
            width={400}
            height={100}
            alt="animate-doctor.png"
            loading="lazy"
          />
        </div>
        <div className="flex items-center justify-center h-full">
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className="text-center text-white font-bold text-6xl cursor-pointer"
          >
            Welcome Back
          </motion.h1>
        </div>
        <div
          className="absolute top-0 right-0 z-10 "
          style={{ transform: 'rotate(180deg)' }}
        >
          <Image
            src={purpleFluid}
            width={300}
            height={100}
            alt="fluid.png"
            loading="lazy"
          />
        </div>
        <div
          className="absolute top-0 right-0 opacity-20"
          style={{ transform: 'rotate(180deg)' }}
        >
          <Image
            src={purpleFluid}
            width={500}
            height={100}
            alt="fluid.png"
            loading="lazy"
          />
        </div>
        <div className="absolute -left-8 top-0">
          <Image
            src={injectionPink}
            width={200}
            height={200}
            alt="injection-pink.png"
            loading="lazy"
          />
        </div>
        <div className="absolute top-0 left-80 ">
          <Image
            src={injectionNotes}
            width={100}
            height={200}
            alt="injection-pink.png"
            style={{ transform: 'rotate(10deg)' }}
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <div className="relative bg-white w-[350px] h-[350px] rounded-[20px]">
          <div className="blur-background">
            <div className="testing-blur"></div>
          </div>
          <div className="w-24 h-24 absolute flex items-center justify-center top-24 right-1/2 translate-x-1/2 bg-white shadow-lg rounded-full ">
            <i class="bx bxs-user text-5xl"></i>
          </div>
          <div className="mt-12 text-center">
            <p>Muhammad Ghifani Ikhsan</p>
            <p className="text-xs">ghifaniikhsan114@gmail.com</p>
            <div className=" p-4 border-2 border-purple-900 mt-4">Tiket</div>
          </div>
        </div>
        <div className="w-full h-[300px] bg-white rounded-lg">
          <div className="flex justify-between">
            <p>Anggota Keluarga Saya</p>
            <p>Tambah Anggota keluarga</p>
          </div>

          <div className="flex items-center gap-3 h-full">
            <div className="w-28 h-20 border-2 border-black rounded-xl">
              <div className="text-end">
                <i class="bx bx-edit-alt"></i>
              </div>
              <div className="flex items-center justify-center">
                <p>Nama</p>
              </div>
            </div>
            <div className="w-28 h-20 border-2 border-black rounded-xl">
              <div className="text-end">
                <i class="bx bx-edit-alt"></i>
              </div>
              <div className="flex items-center justify-center">
                <p>Nama</p>
              </div>
            </div>
            <div className="w-28 h-20 border-2 border-black rounded-xl">
              <div className="text-end">
                <i class="bx bx-edit-alt"></i>
              </div>
              <div className="flex items-center justify-center">
                <p>Nama</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
