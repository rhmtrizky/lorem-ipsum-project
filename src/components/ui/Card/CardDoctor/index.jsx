import React from 'react';
import { doctorCard, stetoskopPurple } from '@/assets/images/images';
import Image from 'next/image';

export default function CardDoctor({ name, spesialisasi, image }) {
  const nameSplit = name.split(' ');

  const displayName = nameSplit.length > 6 ? nameSplit.slice(0, 5).join(' ') + ' ...' : name;

  return (
    <div className="flex flex-col justify-between lg:w-[240px] md:w-[220px] sm:w-fit w-fit lg:h-[315px] md:h-[300px] sm:h-[290px] h-[290px] bg-white shadow-lg rounded-xl p-4 transform hover:scale-105 transition duration-500 ease-in-out cursor-pointer">
      <div className="flex flex-col items-start">
        <div className="w-full flex justify-center">
          <Image
            src={image}
            width={240}
            height={200}
            alt="doctor.png"
            className="rounded-lg"
          />
        </div>
        <div className="mt-2">
          <p className="font-bold font-sans cursor-default lg:text-base md:text-base sm:text-sm text-sm">{displayName}</p>
          <div className="flex gap-2 my-1.5">
            <Image
              src={stetoskopPurple}
              width={15}
              height={15}
              alt="stetoskop.png"
            />
            <p className="text-xs text-primary font-semibold cursor-default">{spesialisasi}</p>
          </div>
        </div>
      </div>
      <button className="border-2 border-primary hover:bg-primary hover:text-white rounded-full py-1 px-4 text-xs font-semibold mt-3 transition duration-[.3s] ease-linear">Lihat Jadwal</button>
    </div>
  );
}
