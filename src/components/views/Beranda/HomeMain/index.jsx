import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import PoliCard from '@/components/ui/Card/PoliCard';
import Head from 'next/head';
import Loader from '@/components/ui/Loader';
import HomeBanner from '../HomeBanner';
import HomeHelp from '../HomeHelp';
import HomeLike from '../HomeLike';
import HomeQualifiedDoctors from '../HomeQualifiedDoctor';
import HomeFeedback from '../HomeFeedback';
import Footer from '@/components/ui/Footer';

export default function HomeMain() {
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const shadow = useTransform(scrollYProgress, [0, 1], ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 10px 30px rgba(0, 0, 0, 0.3)']);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>RS Harapan Bunda | Home</title>
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <section className="w-full 2xl:flex 2xl:justify-center h-fit relative mt-3">
            <div className='w-full min-[1600px]:w-[90%] flex flex-col min-[774px]:flex-row justify-center gap-3 ' >
              <div className="w-full min-[774px]:w-[80%] xl:w-[90%] flex justify-center">
                <HomeBanner />
              </div>
              <PoliCard />
            </div>

          </section>

          <motion.section
            // style={{ boxShadow: shadow }}
            className="flex justify-center min-h-[60vh] mt-2"
          >
            <div className="w-full min-[1600px]:w-[90%] flex justify-center">
              <HomeHelp />
            </div>
          </motion.section>

          <section className="flex justify-center p-5">
            <HomeLike />
          </section>

          <section className="min-[1600px]:flex min-[1600px]:justify-center m-5">
            <div className='min-[1600px]:w-[90%] ' >
              <HomeQualifiedDoctors />
            </div>
          </section>

          <section className='xl:mt-12' >
            <HomeFeedback />
          </section>
        </>
      )}
    </>
  );
}
