import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { doctorNote } from '@/assets/images/images';
import Image from 'next/image';

const useCounterAnimation = (initialValue, endValue, duration) => {
    const count = useMotionValue(initialValue);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, endValue, { duration });
        return () => animation.stop();
    }, [count, endValue, duration]);

    return rounded;
};

export default function HomeHelp() {
    const roundedHappyCustomers = useCounterAnimation(0, 10, 2);
    const roundedMonthlyVisitors = useCounterAnimation(0, 4, 2);
    const roundedCountriesWorldwide = useCounterAnimation(0, 8, 2);
    const roundedTrustPilots = useCounterAnimation(0, 9, 2);

    return (
        <div>
            <div className='flex justify-center gap-6 mt-6'>
                <div className='text-center'>
                    <motion.h2 className='text-[#3b82f6] text-[36px] font-bold'>
                        {roundedHappyCustomers}
                    </motion.h2>
                    <p className='text-sm font-semibold'>Happy Customers</p>
                </div>
                <div className='text-center'>
                    <motion.h2 className='text-[#3b82f6] text-[36px] font-bold'>
                        {roundedMonthlyVisitors}
                    </motion.h2>
                    <p className='text-sm font-semibold'>Monthly Visitors</p>
                </div>
                <div className='text-center'>
                    <motion.h2 className='text-[#3b82f6] text-[36px] font-bold'>
                        {roundedCountriesWorldwide}
                    </motion.h2>
                    <p className='text-sm font-semibold'>Countries Worldwide</p>
                </div>
                <div className='text-center'>
                    <motion.h2 className='text-[#3b82f6] text-[36px] font-bold'>
                        {roundedTrustPilots}
                    </motion.h2>
                    <p className='text-sm font-semibold'>Trust Pilots</p>
                </div>
            </div>

            <div className='flex justify-center mt-28'>
                <div>
                    <div>
                        <h1 className='text-[#3b82f6]'>-Who we are</h1>
                        <h1 className='text-6xl font-bold my-4'>
                            We Help To Get <br />Solutions
                        </h1>
                        <p className='text-[#7C8DA5]'>
                            Daftarkan diri Anda untuk menjadi lebih sehat
                        </p>
                        <button className='bg-[#3b82f6] text-white font-semibold rounded-lg py-2 px-8 mt-4'>
                            Cara Daftar
                        </button>
                    </div>
                </div>
                <div>
                    <Image src={doctorNote} width={770} height={600} alt='doctor-note.png' />
                </div>
            </div>
        </div>
    );
}
