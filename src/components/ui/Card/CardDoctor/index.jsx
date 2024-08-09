import { doctorCard, stetoskopPurple } from '@/assets/images/images'
import Image from 'next/image'
import React from 'react'

export default function CardDoctor({name, spesialisasi}) {
    return (
        <div className='flex flex-col items-center w-[220px] h-[290px] bg-white shadow-lg rounded-xl p-4' >
            <div className='w-[170px]' >
                <Image src={doctorCard} width={200} height={200} alt='doctor.png' className='rounded-lg' />
            </div>
            <div className='mt-3' >
                <p className='font-bold font-sans' >{name}</p>
                <div className='flex gap-2 my-1.5'>
                    <Image src={stetoskopPurple} width={15} height={15} alt='stetoskop.png'/>
                    <p className='text-xs text-[#654AB4] font-semibold' >{spesialisasi}</p>
                </div>
                <button className='border-2 border-[#654AB4] hover:bg-[#654AB4] hover:text-white rounded-full py-1 px-4 text-xs font-semibold mt-3' >Lihat Jadwal</button>
            </div>
        </div>
    )
}