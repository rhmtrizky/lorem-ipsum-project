import { hospitalPurple, stetoskopPurple } from '@/assets/images/images'
import Image from 'next/image'
import React from 'react'

export default function CardDoctorSchedule({name, specialist, image}) {
    return (
        <div className='w-full' >
            <div className='flex items-center gap-6 bg-white w-full h-max shadow-lg p-3 rounded-lg' >
                <div>
                    <Image src={image} width={250} height={250} alt='doctor.png' />
                </div>

                <div>
                    <p className='text-slate-500 text-semibold text-xl' >{name}</p>
                    <div className='flex items-center gap-1.5 my-1.5' >
                        <Image src={stetoskopPurple} width={15} height={15} alt='stetoskop.png' />
                        <p className='text-[#654AB4] cursor-default text-[14px]' >{specialist}</p>
                    </div>
                    <div className='flex items-center gap-1.5' >
                        <Image src={hospitalPurple} width={15} height={15} alt='hospital.png'  />
                        <p className='text-[#654AB4] cursor-default text-[14px]' >RS.Harapan Bunda</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
