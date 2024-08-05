import { Swiper, SwiperSlide } from 'swiper/react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { FreeMode, Pagination } from 'swiper/modules'
import { useEffect, useRef } from 'react'
import { datas } from '@/constraint'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

export default function ActiveSlider() {

    const count = useMotionValue(0)
    const rounded = useTransform(count, Math.round)
    const h2ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const animation = animate(count, 100, {duration: 1})
                    return () => animation.stop()
                }
            },
            {threshold: 0.1}
        )

        if(h2ref.current) {
            observer.observe(h2ref.current)
        }

        return () => {
            if(h2ref.current) {
                observer.unobserve(h2ref.current)
            }
        }
    }, [count])

    return (
        <motion.div ref={h2ref} className='flex items-center justify-center flex-col h-min p-3 ' >
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
                    datas.map((item) => (
                        <SwiperSlide key={item.name} >
                        <div className='flex flex-col justify-center bg-[#654AB4] rounded-lg p-2 mb-12 max-[340px]:mr-1.5'>
                            <div className='w-max bg-slate-200 p-2.5 rounded-full' >
                                <Image src={item.image} width={40} height={40} alt={item.name}/>
                            </div>

                            <div className='text-white ' >
                                <h3>{item.name}</h3>
                            </div>

                            <div className='flex gap-1 text-white text-xs' >
                                <p>Jumlah Antrian: </p>
                                <motion.h2 >{rounded}</motion.h2>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </motion.div>
    )
}