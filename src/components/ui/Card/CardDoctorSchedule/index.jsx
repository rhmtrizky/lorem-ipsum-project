import { hospitalPurple, stetoskopPurple, userIcon } from '@/assets/images/images';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import SkeletonLine from '../../Skeleton/SkeletonLine';

export default function CardDoctorSchedule({ name, specialist, image, queuePasient }) {
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center gap-2 bg-white w-full h-max shadow-lg px-3 py-5 rounded-lg">
        <div>
          {image ? (
            <Image
              src={image}
              width={230}
              height={260}
              alt="doctor.png"
              className="rounded-full max-w-[150px] h-[150px] object-cover"
            />
          ) : (
            <Image
              src={userIcon}
              width={150}
              height={150}
              alt="doctor.png"
              className="rounded-full max-w-[150px] h-[150px] object-cover"
            />
          )}
        </div>

        <div className="flex flex-col items-center">
          {name ? <p className="text-slate-500 text-semibold text-md text-center">{name}</p> : <SkeletonLine />}
          {/* <p className="text-slate-500 text-semibold text-md text-center">{name}</p> */}
          {specialist ? (
            <div className="flex items-center gap-1.5 my-1.5">
              <Image
                src={stetoskopPurple}
                width={15}
                height={15}
                alt="stetoskop.png"
              />
              <p className="text-primary cursor-default text-[14px]">{specialist}</p>
            </div>
          ) : (
            <SkeletonLine />
          )}

          <div className="flex items-center gap-1.5">
            <Image
              src={hospitalPurple}
              width={15}
              height={15}
              alt="hospital.png"
            />
            <p className="text-primary cursor-default text-[14px]">RS.Harapan Bunda</p>
          </div>
          {queuePasient !== undefined ? <Button className="h-8 flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-white py-3 px-4 rounded-full shadow-lg hover:shadow-purple-500/50 text-sm mt-3 font-semibold">Antrian Hari Ini : {queuePasient}</Button> : <SkeletonLine />}
        </div>
      </div>
    </div>
  );
}
