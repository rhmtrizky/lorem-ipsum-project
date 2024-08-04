import { logo } from '@/assets/images/images'
import { datas } from '@/constraint'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

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
    )
}
