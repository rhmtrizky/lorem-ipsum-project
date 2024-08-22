import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { datas } from '@/constraint';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import queueActivityService from '@/services/activity/queue';

const useCounterAnimation = (initialValue, endValue, duration) => {
  const count = useMotionValue(initialValue);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, endValue, { duration });
    return () => animation.stop();
  }, [count, endValue, duration]);

  return rounded;
};

export default function PoliCard() {
  const [queue, setQueue] = useState([]);
  const getQueueActivity = async () => {
    try {
      const { data } = await queueActivityService.getQueueActivity();
      setQueue(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const countQueueActivity = (specialistType) => {
    const filteredBySpecialist = queue.filter((item) => {
      return item.specialist === specialistType;
    });
    return filteredBySpecialist.length;
  };

  useEffect(() => {
    getQueueActivity();
  }, []);

  const roundedPoliUmum = useCounterAnimation(0, countQueueActivity('poli umum'), 2);
  const roundedPoliMata = useCounterAnimation(0, countQueueActivity('poli mata'), 2);
  const roundedPoliPenyakitDalam = useCounterAnimation(0, countQueueActivity('poli penyakit dalam'), 2);
  const roundedPoliKandungan = useCounterAnimation(0, countQueueActivity('poli kandungan'), 2);
  const roundedPoliGigi = useCounterAnimation(0, countQueueActivity('poli gigi'), 2);

  const arrayPoli = [roundedPoliMata, roundedPoliUmum, roundedPoliGigi, roundedPoliPenyakitDalam, roundedPoliKandungan];

  return (
    <>
      {/* Tampilan pada 774px - seterusnya */}
      <motion.div className="hidden min-[774px]:w-[25%] lg:w-[20%] xl:w-[17%] min-[774px]:flex flex-col justify-center gap-2 border h-max xl:mr-1">
        <div className="flex gap-3 justify-center flex-col">
          {datas.map((poli, index) => (
            <div
              key={poli.name}
              className="border-2 border-purple-600 xl:w-[210px] h-[100px] flex flex-col justify-center bg-white shadow-sm rounded-lg p-2 mr-3"
            >
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-full">
                  <Image
                    src={poli.image}
                    width={40}
                    height={40}
                    alt={poli.name}
                  />
                </div>
                <h3 className="text-[#654AB4] font-bold ">{poli.name}</h3>
              </div>
              <div className="flex gap-1 text-slate-500">
                <p>Jumlah Antrian: </p>
                <motion.p>{arrayPoli[index]}</motion.p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tampilan pada 0px - 773px */}
      <motion.div className="flex flex-col items-center justify-center h-min p-3 min-[774px]:hidden">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            501: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[90%] lg:max-w-[80%]"
        >
          {datas.map((poli, index) => (
            <SwiperSlide key={poli.name}>
              <div className="border-2 border-purple-600 xl:w-[210px] h-[100px] flex flex-col justify-center bg-white shadow-sm rounded-lg p-2 mb-12 mr-1.5">
                <div className="flex items-center gap-2">
                  <Image
                    src={poli.image}
                    width={40}
                    height={40}
                    alt={poli.name}
                  />
                </div>
                <h3 className="text-[#654ab4] font-bold">{poli.name}</h3>
                <div className="flex gap-1 text-slate-500 text-xs min-[585px]:text-sm">
                  <p>Jumlah Antrian: </p>
                  <motion.p>{arrayPoli[index]}</motion.p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  );
}
