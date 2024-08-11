import { addUser, bufferBro, hospitalPurple } from '@/assets/images/images'
import CardDoctorSchedule from '@/components/ui/Card/CardDoctorSchedule'
import FormAdd from '@/components/ui/FormAdd'
import Header from '@/components/ui/Header'
import Image from 'next/image'
import React from 'react'

export default function AppointmentsView() {

    return (
        <>
            <Header/>
            <section className='w-full' >
                <div className='flex justify-center mt-12 ' >
                    <div className='bg-white w-[800px]' >
                        <div className='w-full h-[70px] flex items-center px-8' >
                            <div className='flex gap-1 items-center text-[#000000ab] hover:text-[#654AB4] font-normal' style={{transition: '.3s ease'}} >
                                <Image src={addUser} width={25} height={25} alt='...' />
                                <FormAdd/>
                            </div>
                        </div>
                        <div className='px-8 my-4' >
                            <hr/>
                        </div>
                        <div className='flex flex-col items-center' >
                                <div className='flex flex-col items-center' >
                                    <p>Silahkan lengkapi profil Anda terlebih dahulu</p>
                                    <button className='w-max bg-[#654AB4] hover:bg-[#4e3a8b] rounded-full py-3.5 px-5 my-4 text-white text-[12px] rubik' style={{transition: '.3s ease-out'}} >LENGKAPI PROFIL SAYA</button>
                                    <Image 
                                        src={bufferBro}
                                        width={400}
                                        height={400}
                                        alt='buffer-bro.png'
                                        className='border'
                                    />
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </>
    )
}