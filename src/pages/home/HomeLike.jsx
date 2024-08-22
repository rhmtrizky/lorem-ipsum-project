import { BorderBeam } from '@/components/magicui/border-beam'
import React from 'react'


export default function HomeLike() {
    return (
        // w[40%]
        <div className="relative bg-[#ffffff49] min-[500px]:h-[120px] h-max flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl py-4">
            <div className="flex flex-wrap gap-1 justify-evenly w-full ">
                <div className='flex  flex-col items-center justify-center relative bg-purpl-950 w-[150px] h-[80px] rounded-lg text-purple-900' >
                    <div >
                        <p className='text-end absolute right-10 top-2 font-extrabold text-2xl font-sans' >+</p>
                        <p className='font-extrabold text-3xl font-sans' >50</p>
                    </div>
                    <p className='text-xs font-semibold text-center ' >Dokter Ahli</p>
                </div>
                <div className='flex  flex-col items-center justify-center relative bg-purpl-950 w-[150px] h-[80px] rounded-lg text-purple-900' >
                    <div >
                        <p className='text-end absolute right-5 top-4 font-semibold text- font-sans' >Juta</p>
                        <p className='font-extrabold text-3xl font-sans' >5.2</p>
                    </div>
                    <p className='text-xs font-semibold text-center ' >Pasien</p>
                    <BorderBeam size={200} duration={12} delay={9} className={'max-[345px]:block hidden'} />
                </div>
                <div className='flex flex-col items-center justify-center relative bg-purpl-950 w-[150px] h-[80px] rounded-lg text-purple-900' >
                    <div >
                        <p className='text-end absolute right-8 top-2 font-extrabold text-2xl font-sans' >+</p>
                        <p className='font-extrabold text-3xl font-sans' >100</p>
                    </div>
                    <p className='text-xs font-semibold text-center ' >Menyukai Website</p>
                    <BorderBeam size={200} duration={12} delay={9} className={'max-[345px]:hidden max-[499px]:block hidden'} />

                </div>
            </div>
            <BorderBeam size={150} duration={12} delay={9} />
        </div>
    )
}

// ketika di wrap yg 5.2 juta beam nya hilang terus pindah ke 