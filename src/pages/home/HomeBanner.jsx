import { bgBanner, doctorAnimate, hospital, hospitalHarapanBunda } from '@/assets/images/images'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

export default function HomeBanner() {
    return (
        <article className='w-full h-[550px] bg-gradient-radial flex justify-center items-center relative overflow-hidden'>
            <div className='text-white' >
                <p className='text-xl font-semibold' >Selamat datang di</p>
                <h1 className='text-6xl font-bold my-2 ' >Rumah Sakit <br/> Harapan Bunda</h1>
                <p className='text-sm mt-6' >Ambil antrianmu menjadi lebih mudah <br/> dan ambil antriannya sekarang. </p>
                <button type='click' className='bg-button-pink font-semibold py-1 px-4 rounded-lg mt-8' >Ambil Antrian</button>
            </div>
            <div>
                <Image src={hospitalHarapanBunda} width={600} height={600} alt='hospital.png' />
            </div>
            {/* <div className='absolute left-0' >
                <Image src={bgBanner} width={450} height={550} alt='bg-banner.png' />
            </div>
            <div className='absolute -bottom-12 right-0' >
                <Image src={hospital} width={550} height={550} alt='hospital.png' />
            </div> */}
        </article>
    )
}