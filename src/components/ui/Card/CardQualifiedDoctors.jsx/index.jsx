import { stetoskopPurple } from '@/assets/images/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export default function CardQualifiedDoctor({ doctors }) {

    const truncateName = (fullname) => {
        const maxLength = 40; 
        if (fullname.length > maxLength) {
            return fullname.slice(0, maxLength) + '...';
        }
        return fullname;
    };

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
                    spaceBetween: 15,
                },
            }}
            freeMode={true}
            pagination={{
                clickable: true,
            }}
            modules={[FreeMode, Pagination]}
        >
            {doctors.slice(0, 3).map((doctor, index) => (
                <SwiperSlide key={index}>
                    <Link href={`/schedules/${doctor.id}`} >
                        <div className="flex flex-col w-[220px] h-[290px] bg-white shadow-lg rounded-xl p-4 transform transition duration-500 ease-in-out cursor-pointer my-12">
                            <div className="w-full flex justify-center">
                                <Image
                                    src={doctor.image}
                                    width={200}
                                    height={200}
                                    alt="doctor.png"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="mt-3">
                                <p className="font-bold font-sans">
                                    {truncateName(doctor.fullname)}
                                </p>
                                <div className="flex gap-2 my-1.5">
                                    <Image
                                        src={stetoskopPurple}
                                        width={15}
                                        height={15}
                                        alt="stetoskop.png"
                                    />
                                    <p className="text-xs text-primary font-semibold cursor-default">
                                        {doctor.specialist}
                                    </p>
                                </div>
                                <button className="border-2 border-primary hover:bg-primary hover:text-white rounded-full py-1 px-4 text-xs font-semibold mt-3 transition duration-[.3s] ease-linear">
                                    Lihat Jadwal
                                </button>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
