import { injection, stetoskop, termometer, youngDoctor } from '@/assets/images/images';
import Link from 'next/link';

export default function HomeHelp() {
  return (
    <div className="w-full relative flex justify-center items-center max-[850px]:flex-col-reverse max-[1195px]:gap-12 overflow-auto px-3 sm:px-8">
      <div className="w-[70%] flex justify-center max-[1195px]:ml-1 ">
        <div className="min-[350px]:overflow-visible relative box bg-gradient-to-t from-secondary to-primary">
          <div className="absolute max-[349px]:-left-36 -left-20 -top-[51px] inset-0 w-[550px]">
            <img
              src={youngDoctor}
              alt="young-doctor.png"
              loading="lazy"
            />
          </div>
          <img
            src={termometer}
            alt="termometer.png"
            className="w-12 h-12 absolute -left-6 animate-up-down"
            loading="lazy"
          />
          <img
            src={stetoskop}
            alt="termometer.png"
            className="w-12 h-12 absolute left-4 -top-8 origin-center rotate-[30deg] animate-up-down"
            loading="lazy"
          />
          <img
            src={injection}
            alt="termometer.png"
            className="hidden min-[355px]:block w-12 h-12 absolute -right-6 top-0 animate-up-down"
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full xl:w-[75%] flex justify-center">
        <div className="flex justify-center">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-primary">-Who we are</h2>
            <h1 className="text-2xl xl:text-5xl font-bold my-4">
              Kami Hadir untuk <span className="text-primary">Membantu</span> dan <span className="text-primary">Menemukan Solusi</span>
            </h1>
            <p className="w text-slate-600 font-semibold bg-text-help hidden md:flex">
              Daftarkan diri Anda untuk menjadi lebih sehat, <br />
              Anda bisa lihat cara daftar dengan mengklik tombol dibawah ini.
            </p>
            <Link href={'flow-bpjs-regis'}>
              <button
                className="w-56 h-12 border-2 border-primary text-black hover:bg-primary hover:text-white font-bold rounded-lg py-2 px-8 mt-4"
                style={{ transition: '.3s ease' }}
              >
                Cara Daftar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
