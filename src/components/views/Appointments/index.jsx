import { addUser, bufferBro } from '@/assets/images/images';
import CardDoctorSchedule from '@/components/ui/Card/CardDoctorSchedule'
import FormAdd from '@/components/ui/Form';
import Header from '@/components/ui/Header'
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

export default function SchedulesDoctor() {

    const router = useRouter();
    const { name, specialist, schedule } = router.query;

    // Parse the schedule back to an object or array
    const doctorSchedule = schedule ? JSON.parse(schedule) : [];

    return (
        <>
            <Header/>
            <section className='flex gap-3 my-8 mx-24' >
                <div className='mt-12' >
                    <CardDoctorSchedule 
                        name={name}
                        specialist={specialist}
                    />
                    <div className='mt-4' >
                        <div className='w-[180px] h-[50px] flex justify-center items-center gap-2 bg-[#654AB4] shadow-lg ' >
                            <div className='dot' ></div>
                            <p className='text-white font-semibold cursor-default' >JADWAL DOKTER</p>
                        </div>
                        <div className='bg-white border-2 border-dashed w-full h-max p-4' >
                            <p className='mb-4 text-lg text-semibold text-slate-600' >{name}</p>
                            <div className='flex flex-col gap-2.5 font-light' >
                                {doctorSchedule.map((item, index) => (
                                    <li key={index} className='flex justify-between'>
                                        {item.day}
                                        <div className='flex gap-3' >
                                            <span>{item.startTime}</span>
                                            -
                                            <span>{item.endTime}</span>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

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