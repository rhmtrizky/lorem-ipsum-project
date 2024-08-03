import { logo } from '@/assets/images/images'
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
        <div className='flex gap-3 justify-center flex-wrap'>
            {/* <div className='flex justify-between bg-slate-600 w-[350px] h-32 rounded-lg'>
                <div>
                    <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
                </div>
                <div className='bg-red-600 w-[100px] rounded-lg' >
                    <Image src={logo} width={40} height={40} alt='card.png'/>
                </div>
            </div>
            <div className='flex justify-between bg-slate-600 w-[350px] h-32 rounded-lg'>
                <div>
                    <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
                </div>
                <div className='bg-red-600 w-[100px] rounded-lg' >
                    <Image src={logo} width={40} height={40} alt='card.png'/>
                </div>
            </div>
            <div className='flex justify-between bg-slate-600 w-[350px] h-32 rounded-lg'>
                <div>
                    <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
                </div>
                <div className='bg-red-600 w-[100px] rounded-lg' >
                    <Image src={logo} width={40} height={40} alt='card.png'/>
                </div>
            </div>
            <div className='flex justify-between bg-slate-600 w-[350px] h-32 rounded-lg'>
                <div>
                    <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
                </div>
                <div className='bg-red-600 w-[100px] rounded-lg' >
                    <Image src={logo} width={40} height={40} alt='card.png'/>
                </div>
            </div>
            <div className='flex justify-between bg-slate-600 w-[350px] h-32 rounded-lg'>
                <div>
                    <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
                </div>
                <div className='bg-red-600 w-[100px] rounded-lg' >
                    <Image src={logo} width={40} height={40} alt='card.png'/>
                </div>
            </div>
            <div className='flex justify-between bg-slate-600 w-[350px] h-32 rounded-lg'>
                <div>
                    <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
                </div>
                <div className='bg-red-600 w-[100px] rounded-lg' >
                    <Image src={logo} width={40} height={40} alt='card.png'/>
                </div>
            </div> */}


            
        </div>
    )
}
