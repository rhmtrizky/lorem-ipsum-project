import { hospitalPurple, stetoskopPurple, userIcon } from '@/assets/images/images';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

export default function CardDoctorSchedule({ name, specialist, image, queuePasient }) {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center gap-2 bg-white w-full h-max shadow-lg px-3 py-5 rounded-lg">
        <div>
          {image ? (
            <Image
              src={image}
              width={230}
              height={230}
              alt="doctor.png"
              className="rounded-full"
            />
          ) : (
            <Image
              src={userIcon}
              width={150}
              height={150}
              alt="doctor.png"
              className="rounded-full"
            />
          )}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-slate-500 text-semibold text-md text-center">{name}</p>
          <div className="flex items-center gap-1.5 my-1.5">
            <Image
              src={stetoskopPurple}
              width={15}
              height={15}
              alt="stetoskop.png"
            />
            <p className="text-primary cursor-default text-[14px]">{specialist}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              src={hospitalPurple}
              width={15}
              height={15}
              alt="hospital.png"
            />
            <p className="text-primary cursor-default text-[14px]">RS.Harapan Bunda</p>
          </div>
          <Button className="h-8 flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-white py-3 px-4 rounded-full shadow-lg hover:shadow-purple-500/50 text-sm mt-3 font-semibold">Antrian Hari Ini : {queuePasient}</Button>
        </div>
      </div>
    </div>
  );
}
