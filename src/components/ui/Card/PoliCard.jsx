import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
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
            { threshold: 0.1 } // Trigger when 10% of the element is visible
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
        <div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div><div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div>
            <div className='bg-slate-600 w-[400px] h-40 text-red-600'>
                <motion.h2 ref={h2Ref}>{rounded}</motion.h2>
            </div>
            <div className='bg-slate-600 w-[400px] h-40'>
                <h2>PoliCard</h2>
            </div>
            <div className='bg-slate-600 w-[400px] h-40'>
                <h2>PoliCard</h2>
            </div>
            <div className='bg-slate-600 w-[400px] h-40'>
                <h2>PoliCard</h2>
            </div>
            <div className='bg-slate-600 w-[400px] h-40'>
                <h2>PoliCard</h2>
            </div>
            <div className='bg-slate-600 w-[400px] h-40'>
                <motion.h2>{rounded}</motion.h2>
            </div>
        </div>
    )
}
