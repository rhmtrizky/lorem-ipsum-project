import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { datas } from '@/constraint'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

export default function PoliCard() {
    const count = useMotionValue(0)
    const rounded = useTransform(count, Math.round)
    const h2Ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const animation = animate(count, 100, { duration: 3 })
                    return () => animation.stop()
                }
            },
            { threshold: 0.1 }
        )

        if (h2Ref.current) {
            observer.observe(h2Ref.current)
        }

        return () => {
            if (h2Ref.current) {
                observer.unobserve(h2Ref.current)
            }
        }
    }, [count])

    return (
        <>
            {/* Tampilan pada 774px - seterusnya */}
            <div className='hidden min-[774px]:w-[25%] lg:w-[20%] xl:w-[15%] min-[774px]:flex flex-col justify-center gap-2 border h-max xl:mr-1' >
                <div className='flex gap-3 justify-center flex-col'>
                    {
                        datas.map((poli) => (
                            <div ref={h2Ref} key={poli.name} className='border-2 border-purple-600 xl:w-[210px] h-[100px] flex flex-col justify-center bg-white shadow-sm rounded-lg p-2 mr-3' >
                                <div className='flex items-center gap-2' >
                                    <div className='bg-white p-2 rounded-full' >
                                        <Image src={poli.image} width={40} height={40} alt={poli.name}/>
                                    </div>
                                    <h3 className='text-[#654AB4] font-bold ' >{poli.name}</h3>
                                </div>
                                <div className='flex gap-1 text-slate-500' >
                                    <p>Jumlah Antrian: </p>
                                    <motion.p>{rounded}</motion.p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Tampilan pada 0px - 773px */}
            <motion.div ref={h2Ref} className='flex flex-col items-center justify-center h-min p-3 min-[774px]:hidden' >
                <Swiper
                    breakpoints={{
                        340: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        501: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        }
                    }}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className='max-w-[90%] lg:max-w-[80%]'
                >
                    {
                        datas.map((poli) => (
                            <SwiperSlide key={poli.name} >
                                <div className='border-2 border-purple-600 xl:w-[210px] h-[100px] flex flex-col justify-center bg-white shadow-sm rounded-lg p-2 mb-12' >
                                    <div className='flex items-center gap-2' >
                                        <Image src={poli.image} width={40} height={40} alt={poli.name} />
                                    </div>
                                    <h3 className='text-[#654ab4] font-bold' >{poli.name}</h3>
                                    <div className='flex gap-1 text-slate-500 text-xs min-[585px]:text-sm' >
                                        <p>Jumlah Antrian: </p>
                                        <motion.p>{rounded}</motion.p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
                    
            </motion.div>


        </>
    )
}
