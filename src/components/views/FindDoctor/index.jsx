import CardDoctor from '@/components/ui/Card/CardDoctor'
import Filter from '@/components/ui/Filter'
import Header from '@/components/ui/Header'
import React from 'react'

export default function FindDoctor() {
    return (
        <>
            <Header/>
            <section className='flex flex-col items-center w-full min-h-screen ' >
                <div className='w-[80%]' >
                    <div className='mb-4' >
                        <h1 className='text-3xl text-[#654AB4]' >Cari Dokter</h1>
                        <p className='textxs' >Semua dokter berpraktik setiap hari, terdiri dari dokter spesialis, subspesialis sehingga Anda bisa bertemu anggota tim setiap saat. Bekerja secara tim, dari berbagai spesialis multidisplinier, dokter dapat memberikan jalan keluar yang komprehensif untuk setiap masalah yang Anda alami.</p>
                    </div>            
                    <form className='flex gap-2 mb-8' >
                    <label for="default-search" className="mb-2 text-sm font-medium sr-only">Cari Berdasarkan Nama, dan Subspesialis</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-5000" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-[500px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 cursor-pointer" placeholder="Cari berdasarkan Nama, dan Spesialis" />
                    </div>

                    <Filter/>

                    </form>

                    <div className='flex flex-wrap gap-3' >
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Mohamed Ronaldo Brazil"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        {/* <CardDoctor
                            name="Dr.Darwin Nunez A.A.A"
                            spesialisasi="Spesialisasi Piala Dunia"
                        />
                        <CardDoctor
                            name="Dr.Setyoko Adi Putra Wahyudi A.A.A DRS S1 Kalimalang"
                            spesialisasi="Spesialisasi Piala Dunia"
                        /> */}
                    </div>
                </div>
            </section>
        </>
    )
}
