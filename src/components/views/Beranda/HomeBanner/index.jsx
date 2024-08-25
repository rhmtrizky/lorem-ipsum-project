import { hospitalHarapanBunda } from '@/assets/images/images';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function HomeBanner() {

  const router = useRouter()

  const handleFindDoctor = () => {
      router.push({
        pathname: '/find-doctor'
      })
  }


  return (
    <article className="w-full h-[550px] bg-gradient-radial flex flex-col min-[921px]:flex-row justify-center items-center relative rounded-xl mx-3 min-[774px]:ml-3 overflow-hidden">
      <div className="ml-3 md:ml-7 mt-5 min-[430px]:mt-24 min-[921px]:mt-0 text-white">
        <p className="text-xl font-semibold font-poppins ">Selamat datang di</p>
        <h1 className=" text-5xl font-poppins max-[430px]:text-3xl min-[640px]:text-6xl font-bold my-2 ">
          Rumah Sakit <br /> Harapan Bunda
        </h1>
        <p className="text-xs min-[430px]:text-sm mt-6">
          Ambil antrianmu menjadi lebih mudah <br /> dan ambil antriannya sekarang.{' '}
        </p>
        <Link href={'find-doctor'}>
          <button
            type="click"
            className="bg-button-pink font-semibold py-1 px-4 rounded-lg mt-8"
            onClick={handleFindDoctor}
          >
            Ambil Antrian
          </button>
        </Link>
      </div>
      <div>
        <img
          src={hospitalHarapanBunda}
          alt="hospital.png"
          className="w-[400px] min-[921px]:w-[600px]"
        />
      </div>
    </article>
  );
}
