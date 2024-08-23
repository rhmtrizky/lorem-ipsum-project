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
        <div className="flex flex-col items-center bg-gradient-radial w-full h-[60vh] rounded-md px-4 my-12" >
               
            <div className=" flex flex-col items-center justify-center" >
                <h1 className='text-xl font-bold text-primary mb-3' >Qualified Doctors</h1>
                {/* <h2 className='text-6xl font-bold text-slate-800 font-sans' >Keep doctors and <br/> loved ones in the</h2>
                <p className='font-semibold text-slate-500 mt-5' >Security share your comprehensive medical history with <br/> doctors and loved ones, for better communication and <br/> care.</p> */}
                <Button
                    className='w-max border-2 border-primary rounded-full my-4'
                    onClick={() => handleClickCheckDoctor()}
                >
                    Check Doctors
                </Button>
            </div>
            <div className="flex  justify-center items-center w-[50%] max-xl:w-[65%] h-full gap-3" >

                    <CardQualifiedDoctor
                        
                    />
            </div>

        </div>
    )
}