import { doctorCard, stetoskopPurple } from '@/assets/images/images'
import Image from 'next/image'
import React from 'react'

export default function CardDoctor({name, spesialisasi}) {
    return (
        <div className='flex flex-col items-center w-[220px] h-[290px] bg-white shadow-lg rounded-xl p-4 transform hover:scale-105 transition duration-500 ease-in-out' >
            <div className='w-[170px]' >
                <Image src={doctorCard} width={200} height={200} alt='doctor.png' className='rounded-lg' />
            </div>
            <div className='mt-3' >
                <p className='font-bold font-sans cursor-default' >{name}</p>
                <div className='flex gap-2 my-1.5'>
                    <Image src={stetoskopPurple} width={15} height={15} alt='stetoskop.png'/>
                    <p className='text-xs text-[#654AB4] font-semibold cursor-default' >{spesialisasi}</p>
                </div>
                <button className='border-2 border-[#654AB4] hover:bg-[#654AB4] hover:text-white rounded-full py-1 px-4 text-xs font-semibold mt-3 transition duration-[.3s] ease-linear '>Lihat Jadwal</button>
            </div>
        </div>
    )
}