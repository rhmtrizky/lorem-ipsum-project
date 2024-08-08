import { laptop, rightArrow } from '@/assets/images/images'
import { datasFlow } from '@/constraint'
import Header from '@/components/ui/Header'
import Image from 'next/image'
import React from 'react'

export default function FlowRegisBpjs() {
    return (
        <>
            <Header/>
            <section className='min-h-screen  overflow-hidden' >
                <div className='flex flex-col justify-center items-center gap-5 bg-flow-regis overflow-hidden' >
                    <h1 className='text-xl min-[400px]:text-4xl font-bold text-[#fff] cursor-default' >Alur Pendaftaran BPJS</h1>
                    <div className='flex items-center max-[300px]:flex-col max-[400px]:text-xs' >
                        <a href='#' className='mr-1 mb-1.5 text-white font-semibold cursor-pointer hover:text-[#654AB4]' >Beranda</a>
                        <Image src={rightArrow} width={14} height={14} alt='right-arrow.png' className='max-[300px]:hidden' />
                        <p className='text-[#654AB4] blur-text p-1.5 rounded-full ml-2 cursor-default' >Pertanyaan seputar pendaftaran BPJS</p>
                    </div>
                </div>

                <div className='flex justify-evenly items-start max-[600px]:flex-col max-[6000px]:items-center min-[1550px]:justify-center min-[1550px]:gap-40 mt-5' >
                    <div>
                        <Image src={laptop} width={600} height={400} alt='laptop.png' loading='lazy'/>
                    </div>

                    <div className='max-[380px]:w-full w-max px-6' >
                        {
                            datasFlow.map((flow) => (
                                <div key={flow.name} className='flex gap-3 group cursor-default' >
                                    <div className='flex flex-col items-center' >
                                        <div className='max-[300px]:hidden group-hover:bg-gradient-to-b from-[#654AB4] to-[#FFBEBE] flex items-center justify-center w-16 h-16 bg-[#c8c9ca] rounded-xl shadow-md drop-shadow-xl ' >
                                            <p className='text-[#654AB4] font-bold text-lg' >{flow.no}</p>
                                        </div>
                                        <div className='w-2 h-10 bg-[#c8c9ca] my-3 group-hover:bg-[#FFBEBE]' ></div>
                                    </div>
                                    <div className='w-64' >
                                        <h1 className='group-hover:text-purple-700 font-bold ' >{flow.title}</h1>
                                        <p className='text-sm text-slate-600 font-semibold ' >{flow.keterangan}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
