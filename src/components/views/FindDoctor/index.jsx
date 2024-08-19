import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CardDoctor from '@/components/ui/Card/CardDoctor';
import Filter from '@/components/ui/Filter';
import Header from '@/components/ui/Header';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import doctorService from '@/services/user/doctor';
import Loader from '@/components/ui/Loader';
import Head from 'next/head';

export default function FindDoctor() {
    const [isLoading, setIsLoading] = useState(true); // Set loading state to true initially
    const [doctors, setDoctors] = useState([]);
    const [visibleDoctors, setVisibleDoctors] = useState(15);
    const { debounce } = useDebounce();
    const [searchUser, setSearchUser] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await doctorService.getDoctors();
                const doctorData = response.data.data.filter(user => user.role === 'doctor');
                setDoctors(doctorData);
                setIsLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching doctors', error);
                setIsLoading(false); // Ensure loading is false even if an error occurs
            }
        };
        fetchDoctors();
    }, []);
    
    const performSearch = async () => {
        try {
            if (searchUser !== '') {
                const { data } = await doctorService.searchDoctor(searchUser);
                const filteredDoctors = data.data.filter(user => user.role === 'doctor');
                setDoctors(filteredDoctors);
            } else {
                const response = await doctorService.getDoctors();
                const doctorData = response.data.data.filter(user => user.role === 'doctor');
                setDoctors(doctorData);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedSearch = debounce(performSearch, 1000);

    useEffect(() => {
        debouncedSearch();
    }, [searchUser]);

    const handleLoadMore = () => {
        setVisibleDoctors(prevVisibleDoctors => prevVisibleDoctors + 8);
    };

    return (
        <>
            <Head>
                <title>RS Harapan Bundab | Find Doctor</title>
            </Head>
            {
                isLoading
                ? <Loader />
                : (
                    <>
                    
                        <Header />
                        <section className='flex flex-col items-center w-full min-h-screen'>
                            <div>
                                <div className='relative overflow-hidden bg-[#ffbebed7] mt-4 mb-8 mx-6 p-8 shadow-lg'>
                                    <div className='mb-4'>
                                        <div className='flex items-center text-xs font-medium text-[#654AB4] mt-4 mb-8'>
                                            <Link href='/'>Beranda</Link>
                                            <i className='bx bx-chevrons-right mt-0.5'></i>
                                            <span className='text-black'>Cari Dokter</span>
                                        </div>
                                        <h1 className='text-2xl text-slate-700 mb-3 quicksand'>Cari Dokter - Harapan Bunda</h1>
                                        <p className='w-[60%] text-sm z-[99] text-slate-700 rubik'>
                                            Semua dokter berpraktik setiap hari, terdiri dari dokter spesialis, subspesialis sehingga Anda bisa bertemu anggota tim setiap saat.
                                        </p>
                                    </div>

                                    <form className='flex gap-2 mb-8'>
                                        <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Cari Berdasarkan Nama, dan Subspesialis</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-5000" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                                </svg>
                                            </div>
                                            <input
                                                onChange={(e) => setSearchUser(e.target.value)}
                                                type="search"
                                                id="default-search"
                                                className="block w-[500px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 cursor-pointer"
                                                placeholder="Cari berdasarkan Nama, dan Spesialis"
                                            />
                                        </div>
                                        <Filter />
                                    </form>

                                    <div>
                                        <div className='absolute top-0 right-52 bg-pink-600 w-[200px] h-[600px] rounded-full -z-10 border-2 border-purple-600' style={{ transform: 'rotate(-40deg)' }}></div>
                                        <div className='absolute -bottom-28 right-12 bg-pink-600 w-[90px] h-[300px] rounded-full -z-10 border-2 border-purple-600' style={{ transform: 'rotate(-40deg)' }}></div>
                                    </div>
                                </div>

                                <div className='flex justify-center'>
                                    <div className='xl:w-[90%] flex flex-wrap gap-10 justify-center'>
                                        {
                                            doctors.slice(0, visibleDoctors).map((doctor, index) => (
                                                <Link href={`/schedules/${doctor.id}`} key={index}>
                                                    <CardDoctor
                                                        name={doctor.fullname}
                                                        spesialisasi={doctor.specialist}
                                                    />
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                                {
                                    visibleDoctors < doctors.length && (
                                        <div className='flex justify-center mt-6'>
                                            <button
                                                onClick={handleLoadMore}
                                                className='bg-[#654ab4da] text-white rounded-full py-2 px-6 text-sm font-semibold hover:bg-[#654AB4] transition duration-300 ease-linear'
                                            >
                                                Load More
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </section>
                    </>
                )
            }
        </>
    );
}
