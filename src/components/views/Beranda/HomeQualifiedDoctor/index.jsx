import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'
import CardQualifiedDoctor from '@/components/ui/Card/CardQualifiedDoctors.jsx'
import React from 'react'


export default function HomeQualifiedDoctors() {

    const router = useRouter()

    const handleClickCheckDoctor = () => {
        router.push({
            pathname: '/find-doctor'
        })
    }

    return (
        <div className="flex flex-row-reverse max-[1070px]:flex-col justify-evenly items-center gap-4 bg-gradient-radial w-full h-max rounded-md px-1.5 my-12 py-12 min-[1600px]:py-32 " >
            <div className=" flex flex-col justify-center max-[555px]:items-center max-[555px]:text-center  " >
                <h1 className='text-xl font-bold text-primary mb-3' >Qualified Doctors</h1>
                <h2 className='max-[555px]:text-3xl text-6xl font-bold text-slate-800 font-sans ' >Keep doctors and <br/> loved ones in the</h2>
                <p className='font-semibold text-slate-600 mt-5 max-[320px]:text-xs max-[460px]:hidden ' >Security share your comprehensive medical history with <br/> doctors and loved ones, for better communication and <br/> care.</p>
                <Button
                    className='w-max border-2 border-primary rounded-full my-4'
                    onClick={() => handleClickCheckDoctor()}
                >
                    Check Doctors
                </Button>
            </div>
            <div className="flex justify-center items-center max-[575px]:w-[220px] max-[759px]:w-[500px] min-[760px]:w-[500px] h-full gap-3" >
                    <CardQualifiedDoctor
                    />
            </div>

        </div>
    )
}