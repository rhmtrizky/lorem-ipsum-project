import { administrationImage, arrowDottedLeft, dots, rightArrow } from '@/assets/images/images'
import Header from '@/components/ui/Header'
import Image from 'next/image'
import React, { useState } from 'react'
import According from '@/components/ui/According'
// import styles from '@/styles/Faq.module.css'

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null)

    const accorToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <>
            <Header/>
            <section className='min-h-screen overflow-hidden mb-8'>
                <div className='flex flex-col justify-center items-center gap-5 bg-flow-regis overflow-hidden'>
                    <h1 className='text-xl min-[400px]:text-3xl font-bold text-[#fff] cursor-default font-mono'>Pertanyaan Yang Sering Diajukan</h1>
                    <div className='flex items-center max-[300px]:flex-col max-[400px]:text-xs'>
                        <a href='#' className='mr-1 mb-1.5 text-white font-semibold cursor-pointer hover:text-[#654AB4]'>Beranda</a>
                        <Image src={rightArrow} width={14} height={14} alt='right-arrow.png' className='max-[300px]:hidden' />
                        <p className='text-[#654AB4] blur-text p-1.5 rounded-full ml-2 cursor-default'>Pertanyaan Yang Sering Diajukan</p>
                    </div>
                </div>

                <div className='flex items-center gap-28 mt-20'>
                    <div className='relative'>
                        <Image src={administrationImage} width={700} height={500} alt='administration-image.png' loading='lazy' className='' />
                        <Image src={dots} width={150} height={200} alt='dots.png' loading='lazy' className='absolute -bottom-20' />
                        <Image src={arrowDottedLeft} width={50} height={20} alt='arro-dotted.png' loading='lazy' className='absolute -top-6 right-0' />
                    </div>
                    
                    <div className={`h-[90vh] flex flex-col justify-center overflow-y-auto custom `}>
                        <div className='mt-40 mb-6'>
                            <p className='text-[#654AB4] cursor-default font-mono mb-1'>Pertanyaan Yang Sering Diajukan</p>
                            <p className='text-4xl font-bold cursor-default font-mono '>Dapatkan Pertanyaan Anda</p>
                        </div>
                        <According openIndex={openIndex} accorToggle={accorToggle} />
                    </div>
                </div>
            </section>
        </>
    )
}
