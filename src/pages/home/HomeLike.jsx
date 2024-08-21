import { BorderBeam } from '@/components/magicui/border-beam'
import React from 'react'

export default function HomeLike() {
    return (
        <div className="relative bg-[#ffffff49] h-[120px] w-[40%] flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
            <div className="flex justify-evenly w-full ">
                <div className='flex  flex-col items-center justify-center relative bg-purpl-950 w-[150px] h-[80px] rounded-lg text-purple-900' >
                    <div className=' ' >
                        <p className='text-end absolute right-10 top-2 font-extrabold text-2xl font-sans' >+</p>
                        <p className='font-extrabold text-3xl font-sans' >50</p>
                    </div>
                    <p className='text-xs font-semibold text-center ' >Dokter Ahli</p>
                </div>
                <div className='flex  flex-col items-center justify-center relative bg-purpl-950 w-[150px] h-[80px] rounded-lg text-purple-900' >
                    <div className=' ' >
                        <p className='text-end absolute right-5 top-4 font-semibold text- font-sans' >Juta</p>
                        <p className='font-extrabold text-3xl font-sans' >5.2</p>
                    </div>
                    <p className='text-xs font-semibold text-center ' >Pasien</p>
                    <BorderBeam size={200} duration={12} delay={9} />
                </div>
                <div className='flex  flex-col items-center justify-center relative bg-purpl-950 w-[150px] h-[80px] rounded-lg text-purple-900' >
                    <div className=' ' >
                        <p className='text-end absolute right-8 top-2 font-extrabold text-2xl font-sans' >+</p>
                        <p className='font-extrabold text-3xl font-sans' >100</p>
                    </div>
                    <p className='text-xs font-semibold text-center ' >Menyukai Website</p>
                </div>
            </div>
            <BorderBeam size={150} duration={12} delay={9} />
        </div>
    )
}