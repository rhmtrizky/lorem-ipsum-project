import { laptop, rightArrow, videoFlow } from '@/assets/images/images';
import { datasFlow } from '@/constraint';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import BannerContact from '@/components/ui/BannerContact';
import Link from 'next/link';
import { BsYoutube } from 'react-icons/bs';

export default function FlowRegisBpjs() {

  const [isVisible, setIsVisible] = useState(false)

  const show = {
    opacity: 1,
    display: "block"
  }

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  }

  return (
    <section className="min-h-screen  overflow-hidden">
      <BannerContact
        title={'Alur Pendaftaran BPJS'}
        back={'Beranda'}
      />

      <div className="flex justify-evenly items-start max-[600px]:flex-col max-[6000px]:items-center min-[1550px]:justify-center min-[1550px]:gap-40 mt-5">
      <div className='relative w-max h-max' >

            <Image
              src={laptop}
              width={600}
              height={400}
              alt="laptop.png"
              className='relative cursor-pointer'
              onClick={() => setIsVisible(!isVisible)}
            />

        <motion.div animate={isVisible ? show : hide} className='absolute top-10 bottom-0 left-1/2 w-[60%] h-[200px] shadow-xl -z-0' >
          <video autoPlay muted loop >
            <source src={videoFlow} type='video/mp4' />
          </video>
        </motion.div>
        
        <Link className='flex items-center gap-1 justify-center font-semibold font-sans' href={'https://www.youtube.com/watch?v=yRR0w6lcjnY'} >
          <BsYoutube color='red' />
          Youtube
        </Link>
      </div>

        <div className="max-[380px]:w-full w-max px-6">
          {datasFlow.map((flow) => (
            <div
              key={flow.name}
              className="flex gap-3 group cursor-default"
            >
              <div className="flex flex-col items-center">
                <div className="max-[300px]:hidden group-hover:bg-gradient-to-b from-[#654AB4] to-[#FFBEBE] flex items-center justify-center w-16 h-16 bg-[#c8c9ca] rounded-xl shadow-md drop-shadow-xl ">
                  <p className="text-[#654AB4] font-bold text-lg">{flow.no}</p>
                </div>
                <div className="w-2 h-10 bg-[#c8c9ca] my-3 group-hover:bg-[#FFBEBE]"></div>
              </div>
              <div className="w-64">
                <h1 className="group-hover:text-purple-700 font-bold ">{flow.title}</h1>
                <p className="text-sm text-slate-600 font-semibold ">{flow.keterangan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
