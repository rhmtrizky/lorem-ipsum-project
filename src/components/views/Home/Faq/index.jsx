import { administrationImage, arrowDottedLeft, dots, rightArrow } from '@/assets/images/images';
import Header from '@/components/ui/Header';
import Image from 'next/image';
import React, { useState } from 'react';
import According from '@/components/ui/According';
import BannerContact from '@/components/ui/BannerContact';
// import styles from '@/styles/Faq.module.css'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const accorToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen overflow-hidden mb-8">
      <BannerContact
        title={'Pertanyaan Yang Sering Diajukan'}
        back={'Beranda'}
      />

      <div className="flex max-[1000px]:flex-col min-[1550px]:justify-center items-center mt-10 min-[405px]:mt-20">
        <div className="relative min-[1000px]:mr-12">
          <Image
            src={administrationImage}
            width={700}
            height={500}
            alt="administration-image.png"
            loading="lazy"
            className="max-[400px]:w-[300px] max-[710px]:w-[400px] mx-6"
          />
          <Image
            src={dots}
            width={150}
            height={200}
            alt="dots.png"
            loading="lazy"
            className=" max-[700px]:w-[80px] max-[700px]:-bottom-10 absolute -bottom-20"
          />
          <Image
            src={arrowDottedLeft}
            width={50}
            height={20}
            alt="arro-dotted.png"
            loading="lazy"
            className="absolute -top-6 right-0"
          />
        </div>

        <div className={` h-[90vh] max-[545px]:mt-10 max-[1000px]:mt-28 max-[545px]:mx-6 max-[1000px]:ml-12 overflow-y-auto custom `}>
          <div className="w-full mt-4 mb-6 max-[545px]:text-center ">
            <p className="text-[#654AB4] cursor-default font-mono mb-1">Pertanyaan Yang Sering Diajukan</p>
            <p className="text-4xl font-bold cursor-default font-mono ">Dapatkan Pertanyaan Anda</p>
          </div>
          <According
            openIndex={openIndex}
            accorToggle={accorToggle}
          />
        </div>
      </div>
    </section>
  );
}
