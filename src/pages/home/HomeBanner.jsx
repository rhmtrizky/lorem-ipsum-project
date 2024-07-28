import { doctorAnimate } from '@/assets/images/images'
import { motion } from 'framer-motion'
import React from 'react'

export default function HomeBanner() {
    return (
        <article className='w-full relative h-[468px] bg-slate-300 overflow-hidden'>
            <div className='flex flex-col justify-center w-full h-full px-4 max-[260px]:px-2 min-[600px]:block min-[600px]:mt-8 min-[600px]:pl-12 min-[940px]:pl-24 min-[1300px]:pl-40 min-[1300px]:mt-12 '>
                <h2>Selamat Datang di</h2>
                <h1 className='w-full text-[30px] min-[450px]:w-[500px] min-[450px]:text-[50px] text-[#3b82f6] font-bold' >Rumah Sakit Harapan Bunda</h1>
                <p className='w-full min-[450px]:w-[400px]' >Ambil antrianmu menjadi lebih mudah dan dari rumah sekarang!! </p>
                <motion.button whileHover={{y: -4}} className='bg-[#3b82f6] font-semibold text-white p-2 mt-8 rounded-xl' >
                    Antri Sekarang
                </motion.button>
            </div>
            <div className='hidden min-[600px]:block absolute -right-64 min-[1300px]:-right-40 top-1/2 -translate-y-1/3 min-[940px]:-translate-y-1/2 overflow-hidden'>
                <img src={doctorAnimate} alt='doctor-animate.png' className='w-[900px] max-[940px]:w-[730px] object-cover'  />
            </div>
        </article>
    )
}