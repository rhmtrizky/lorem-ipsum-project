import React from 'react'
import { doctorCard, stetoskopPurple } from '@/assets/images/images'
import Image from 'next/image'
import { datasQualifiedDoctor } from '@/constraint';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export default function CardQualifiedDoctor({name, spesialisasi}) {

    return (

            <Swiper
                breakpoints={{
                300: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                },
                574: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                760: {
                    slidesPerView: 2,
                    spaceBetween: 15
                }
                // 768: {
                //     slidesPerView: 3,
                //     spaceBetween: 10
                // },
                // 1000: {
                //     slidesPerView: 4,
                //     spaceBetween: 15,
                // },
            }}
            freeMode={true}
            pagination={{
                clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            >
                    {
                        datasQualifiedDoctor.map((data, index) => (
                            <SwiperSlide key={index} >
                                <div  className='flex flex-col w-[220px] h-[290px] bg-white shadow-lg rounded-xl p-4 transform hover:scale-105 transition duration-500 ease-in-out cursor-pointer mb-8'>
                                    <div className='w-full flex justify-center'>
                                        <Image src={doctorCard} width={200} height={200} alt='doctor.png' className='rounded-lg' />
                                    </div>
                                    <div className='mt-3'>
                                        <p className='font-bold font-sans cursor-default'>
                                            {data.name}
                                        </p>
                                        <div className='flex gap-2 my-1.5'>
                                            <Image src={stetoskopPurple} width={15} height={15} alt='stetoskop.png' />
                                            <p className='text-xs text-primary font-semibold cursor-default'>{data.specialist}</p>
                                        </div>
                                        <button className='border-2 border-primary hover:bg-primary hover:text-white rounded-full py-1 px-4 text-xs font-semibold mt-3 transition duration-[.3s] ease-linear'>
                                            Lihat Jadwal
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
            </Swiper>
    )
}