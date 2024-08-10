import CardDoctorSchedule from '@/components/ui/Card/CardDoctorSchedule'
import Header from '@/components/ui/Header'
import React from 'react'

export default function SchedulesDoctor() {
    return (
        <>
            <Header/>
            <section className='my-8 mx-24' >
                <CardDoctorSchedule/>
                <div className='w-1/2 mt-4' >
                    <div className='w-[180px] h-[50px] flex justify-center items-center gap-2 bg-[#654AB4] shadow-lg ' >
                        <div className='dot' ></div>
                        <p className='text-white font-semibold cursor-default' >JADWAL DOKTER</p>
                    </div>
                    <div className='bg-white border-2 border-dashed w-full h-max p-4' >
                        <p className='mb-4 text-lg text-semibold text-slate-600' >Jadwal Dr.Mohamed Ronaldo Brazil</p>
                        <div className='flex flex-col gap-2.5 font-light' >
                            <li className='flex justify-between' >
                                Senin
                                <span>12.00 - 16.00</span>
                            </li>
                            <li className='flex justify-between' >
                                Selasa
                                <span>12.00 - 16.00</span>
                            </li>
                            <li className='flex justify-between' >
                                Rabu
                                <span>12.00 - 16.00</span>
                            </li>
                            <li className='flex justify-between' >
                                Kamis
                                <span>12.00 - 16.00</span>
                            </li>
                            <li className='flex justify-between' >
                                Jumat
                                <span>12.00 - 16.00</span>
                            </li>
                            <li className='flex justify-between' >
                                Sabtu
                                <span>12.00 - 16.00</span>
                            </li>
                            <li className='flex justify-between' >
                                Minggu
                                <span>12.00 - 16.00</span>
                            </li>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}
