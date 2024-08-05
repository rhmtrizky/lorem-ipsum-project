import { useScroll, useTransform, motion } from 'framer-motion'
import Header from '../../components/ui/Header'
import HomeBanner from './HomeBanner'
import HomePoli from './HomePoli'
import HomeHelp from './HomeHelp'
import React from 'react'
import PoliCard from '@/components/ui/Card/PoliCard'
import ActiveSlider from '@/components/ui/ActiveSlider'

export default function HomeMain() {
  const { scrollYProgress } = useScroll()
  const shadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 10px 30px rgba(0, 0, 0, 0.3)'])

  return (
    <>
      <Header />
      <section className='w-full h-fit relative flex flex-col min-[774px]:flex-row justify-center gap-3 mt-3'>
        <div className='w-full min-[774px]:w-[80%] xl:w-full flex justify-center' >
          <HomeBanner />
        </div>
        <div className='hidden min-[774px]:w-[25%] lg:w-[20%] xl:w-[15%] min-[774px]:flex flex-col justify-center gap-2 border h-max xl:mr-1 '>
          <PoliCard/>
        </div>

        <div className='min-[774px]:hidden' >
          <ActiveSlider/>
        </div>
      </section>
      {/* <motion.section
        className='min-h-screen bg-gradient-white-blue rounded-md mx-10 my-4'
        style={{ boxShadow: shadow }}
      >
        <HomeHelp />
      </motion.section> */}
    </>
  )
}
