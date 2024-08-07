import { laptop } from '@/assets/images/images'
import Header from '@/components/ui/Header'
import { datasFlow } from '@/constraint'
import Image from 'next/image'
import React from 'react'

export default function FlowRegisBpjs() {
    return (
        <>
            <Header/>
            <section className='min-h-screen  overflow-hidden' >
                <div className='flex flex-col justify-center items-center gap-5 bg-flow-regis overflow-hidden' >
                    <h1 className='text-4xl font-bold text-[#fff]' >Alur Pendaftaran BPJS</h1>
                    <p className='text-white font-semibold' >
                        <a className='mr-4' >Beranda</a><span className='text-[#654AB4] blur-text p-1.5 rounded-full' >Pertanyaan seputar pendaftaran BPJS</span>
                    </p>
                </div>

                <div className='flex justify-around items-start mt-5' >
                    <div>
                        <Image src={laptop} width={600} height={400} alt='laptop.png'/>
                    </div>

                    <div >
                        {
                            datasFlow.map((flow) => (
                                <div key={flow.name} className='flex gap-3 group cursor-default' >
                                    <div className='flex flex-col items-center' >
                                        <div className='group-hover:bg-gradient-to-b from-[#654AB4] to-[#FFBEBE] flex items-center justify-center w-16 h-16 bg-[#c8c9ca] rounded-xl shadow-md drop-shadow-xl ' >
                                            <p className='text-[#654AB4] font-bold text-lg' >{flow.no}</p>
                                        </div>
                                        <div className='w-2 h-10 bg-[#c8c9ca] my-3 group-hover:bg-[#FFBEBE]' ></div>
                                    </div>
                                    <div className='w-64' >
                                        <h1 className='group-hover:text-purple-700 font-bold ' >{flow.no}</h1>
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
