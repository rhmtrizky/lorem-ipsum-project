import { rightArrow } from '@/assets/images/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BannerContact({title, back}) {
    return (
        <div className='flex flex-col justify-center items-center gap-5 max-[300px]:gap-3 bg-flow-regis overflow-hidden'>
            <h1 className='text-xl text-center min-[523px]:text-3xl font-bold text-[#fff] cursor-default font-mono'>{title}</h1>
            <div className='flex items-center max-[300px]:flex-col max-[400px]:text-xs'>
                <div className='mb-1' >
                    <Link href={'/'} className='mr-1 mb-1.5 text-white font-semibold cursor-pointer hover:text-[#654AB4]'>{back}</Link>
                </div>
                <Image src={rightArrow} width={14} height={14} alt='right-arrow.png' className='max-[300px]:hidden ' />
                <p className='text-[#654AB4] blur-text p-1.5 rounded-full ml-2 cursor-default'>{title}</p>
            </div>
        </div>
    )
}