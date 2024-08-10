import { doctorCard, hospitalPurple, stetoskopPurple } from '@/assets/images/images'
import Image from 'next/image'
import React from 'react'

export default function CardDoctorSchedule() {
    return (
        <div className='w-1/2' >
            <div className='flex items-center gap-6 bg-white w-full h-[200px] shadow-lg p-3' >
                <div>
                    <Image src={doctorCard} width={250} height={250} alt='doctor.png' />
                </div>

                <div>
                    <p className='text-slate-500 text-semibold text-xl' >Dr.Mohamed Ronaldo Brazil</p>
                    <div className='flex items-center gap-1.5 my-1.5' >
                        <Image src={stetoskopPurple} width={15} height={15} alt='stetoskop.png' />
                        <p className='text-[#654AB4] cursor-default text-[14px]' >Spesialisasi Penjaga Gawang</p>
                    </div>
                    <div className='flex items-center gap-1.5' >
                        <Image src={hospitalPurple} width={15} height={15} alt='hospital.png'  />
                        <p className='text-[#654AB4] cursor-default text-[14px]' >RS.Harapan Bunda</p>
                    </div>
                    <button className='border-2 border-[#654AB4] hover:bg-[#654AB4] hover:text-white rounded-full py-1 px-4 text-xs font-semibold mt-3' style={{transition: '.5s ease'}} >Buat janji</button>
                </div>
            </div>
        </div>
    )
}
