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
          <section className="w-full h-fit relative flex flex-col min-[774px]:flex-row justify-center gap-3 mt-3">
            <div className="w-full min-[774px]:w-[80%] xl:w-full flex justify-center">
              <HomeBanner />
            </div>
            <PoliCard />
          </section>

          <motion.section
            // style={{ boxShadow: shadow }}
            className="flex justify-center min-h-[60vh] mt-7"
          >
            <div className="w-full flex justify-center">
              <HomeHelp />
            </div>
          </motion.section>

          <section className="flex justify-center p-5">
            <HomeLike />
          </section>

          <section className=" m-5">
            <HomeQualifiedDoctors />
          </section>

          <section className="mb-5">
            <HomeFeedback />
          </section>
        </>
      )}
    </>
  );
}
