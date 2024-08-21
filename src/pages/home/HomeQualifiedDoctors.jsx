import { doctorCard } from '@/assets/images/images'
import CardQualifiedDoctor from '@/components/ui/Card/CardQualifiedDoctors.jsx'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export default function HomeQualifiedDoctors() {

    const router = useRouter()

    const handleClickCheckDoctor = () => {
        router.push({
            pathname: '/find-doctor'
        })
    }

    return (
        <div className="flex justify-between bg-gradient-radial w-full h-[75vh] rounded-md p-8" >
            <div className="flex gap-8 ml-12" >
                <div className="flex flex-col gap-8" >
                    <CardQualifiedDoctor
                        name="Dr. Muhammad Ghifani Ikhsan SpD"
                        spesialisasi="Penyakit Dalam"
                    />

                    <CardQualifiedDoctor
                        name="Dr. Rahmat Rizky Rivai SpD"
                        spesialisasi="Penyakit Dalam"
                    />
                </div> 

                <div className="flex flex-col gap-8 mt-8" >
                    
                    <CardQualifiedDoctor
                        name="Dr. Wahyu Hidayat SpD"
                        spesialisasi="Penyakit Dalam"
                    />

                    <CardQualifiedDoctor
                        name="Dr. Ninyomant Anita Rahmadaniarta SpD"
                        spesialisasi="Penyakit Dalam"
                    />
                </div> 
            </div>

            {/* div for text */}
            <div className="w-1/2 flex flex-col justify-center" >
                <h1 className='text-xl font-bold text-primary mb-3' >Qualified Doctors</h1>
                <h2 className='text-6xl font-bold text-slate-800 font-sans' >Keep doctors and <br/> loved ones in the</h2>
                <p className='font-semibold text-slate-500 mt-5' >Security share your comprehensive medical history with <br/> doctors and loved ones, for better communication and <br/> care.</p>
                <Button
                    className='w-max border-2 border-primary rounded-full mt-12'
                    onClick={() => handleClickCheckDoctor()}
                >
                    Check Doctors
                </Button>
            </div>
        </div>
    )
}
