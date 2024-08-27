import React, { useEffect, useState } from 'react';
import CardDoctor from '@/components/ui/Card/CardDoctor';
import Filter from '@/components/ui/Filter';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import doctorService from '@/services/user/doctor';
import SkeletonDoctorCard from '@/components/ui/Skeleton/SkeletonDoctorCard';

export default function FindDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [visibleDoctors, setVisibleDoctors] = useState(8);
  const { debounce } = useDebounce();
  const [doctorName, setDoctorName] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [day, setDay] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const { data } = await doctorService.getDoctors();
      setDoctors(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching doctors', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const performSearch = async () => {
    if (doctorName !== '' || specialist !== '' || day !== '') {
      try {
        const { data } = await doctorService.searchDoctor(doctorName, specialist, day);
        setDoctors(data.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    } else {
      fetchDoctors();
    }
  };

  const debouncedSearch = debounce(performSearch, 500);

  useEffect(() => {
    debouncedSearch();
  }, [doctorName, specialist, day]);

  const handleLoadMore = () => {
    setVisibleDoctors((prevVisibleDoctors) => prevVisibleDoctors + 8);
  };

  return (
    <section className="flex flex-col items-center w-full min-h-screen pb-5">
      <div className="w-full">
        <div className="relative overflow-hidden bg-[#ffbebed7] mt-4 mb-8 mx-2 p-8 shadow-lg rounded-md">
          <div className="mb-4">
            <div className="flex items-center text-xs font-medium text-primary mt-4 mb-8">
              <Link href="/">Beranda</Link>
              <i className="bx bx-chevrons-right mt-0.5"></i>
              <span className="text-black">Cari Dokter</span>
            </div>
            <h1 className="text-2xl text-slate-700 mb-3 quicksand">Cari Dokter - Harapan Bunda</h1>
            <p className="lg:w-[60%] md:w-[80%] sm:w-full w-full text-sm z-[99] text-slate-700 rubik">Semua dokter berpraktik setiap hari, terdiri dari dokter spesialis, subspesialis sehingga Anda bisa bertemu anggota tim setiap saat.</p>
          </div>

          <form className="flex gap-2 mb-8 w-full ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium sr-only"
            >
              Cari Nama Dokter
            </label>
            <div className="relative flex lg:w-[700px] md:w-full sm:w-full w-full items-center">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-5000"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => setDoctorName(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 cursor-pointer"
                placeholder="Cari Nama Dokter"
                style={{ outline: 'none' }}
              />
            </div>
            <Filter
              setSpecialist={setSpecialist}
              setDay={setDay}
            />
          </form>

          <div>
            <div
              className="absolute top-0 right-52 bg-pink-600 w-[200px] h-[600px] rounded-full -z-10 border-2 border-purple-600"
              style={{ transform: 'rotate(-40deg)' }}
            ></div>
            <div
              className="absolute -bottom-28 right-12 bg-pink-600 w-[90px] h-[300px] rounded-full -z-10 border-2 border-purple-600"
              style={{ transform: 'rotate(-40deg)' }}
            ></div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center w-full px-2">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 md:gap-6 sm:gap-2 gap-2 ">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonDoctorCard key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full px-2">
            {/* <SkeletonCard /> */}
            {doctors.length !== 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 md:gap-6 sm:gap-2 gap-2">
                {doctors.slice(0, visibleDoctors).map((doctor, index) => (
                  <Link
                    href={`/schedules/${doctor.id}`}
                    key={index}
                  >
                    <CardDoctor
                      name={doctor.fullname}
                      spesialisasi={doctor.specialist}
                      image={doctor.image}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <i className="bx bxs-message-alt-error text-8xl text-primary"></i>
                <p className="text-lg font-semibold">Dokter tidak ditemukan.</p>
              </div>
            )}
          </div>
        )}

        {visibleDoctors < doctors.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-[#654ab4da] text-white rounded-full py-2 px-6 text-sm font-semibold hover:bg-primary transition duration-300 ease-linear"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
