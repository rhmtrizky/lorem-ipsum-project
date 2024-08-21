import { animateDoctor, injectionNotes, injectionPink, purpleFluid } from '@/assets/images/images'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Header from '@/components/ui/Header'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import userService from '@/services/user'
import FormEditUser from '@/components/ui/Form/FormEditUser'

export default function PatientDashboardLayout({children}) {

    const router = useRouter()
    const isHome = router.pathname.split('/')
    const isFamily = router.pathname.split('/')

    const {data: session} = useSession()
    const [user, setUser] = useState({})

    const getDetailUser = async () => {
        try {
            const response = await userService.detailUser(session.accessToken);
            setUser(response.data.data);
        }
        catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDetailUser();
    }, [session]);



    return (
        <>
            <section className='px-12 py-4 ' >
                <div className='relative w-full h-80 bg-purple-900 rounded-xl overflow-hidden ' >
                    <div className='absolute -top-12' >
                        <Image src={animateDoctor} width={400} height={100} alt='animate-doctor.png' loading='lazy' />
                    </div>
                    <div className='flex items-center justify-center h-full' >
                        <motion.h1 whileHover={{scale: 1.1}} className='text-center text-white font-bold text-6xl cursor-pointer' >Welcome Back</motion.h1>
                    </div>
                    <div className='absolute top-0 right-0 z-10 ' style={{transform: 'rotate(180deg)'}} >
                        <Image src={purpleFluid} width={300} height={100} alt='fluid.png' loading='lazy' />
                    </div>
                    <div className='absolute top-0 right-0 opacity-20' style={{transform: 'rotate(180deg)'}} >
                        <Image src={purpleFluid} width={500} height={100} alt='fluid.png' loading='lazy' />
                    </div>
                    <div className='absolute -left-8 top-0' >
                        <Image src={injectionPink} width={200} height={200} alt='injection-pink.png' loading='lazy' />
                    </div>
                    <div className='absolute top-0 left-80 ' >
                        <Image src={injectionNotes} width={100} height={200} alt='injection-pink.png' style={{transform: 'rotate(10deg)'}} loading='lazy' />
                    </div>
                </div>

                <div className='flex gap-3 mt-6' >
                    <div className='group relative bg-white w-[350px] h-[350px] rounded-[20px]' >
                        <div className='blur-background ' >
                            <div className='blur-card-account' ></div>
                        </div>
                        <div
                            className={`group bg-cover bg-center w-24 h-24 absolute flex items-center justify-center top-24 right-1/2 translate-x-1/2 bg-white shadow-lg rounded-full overflow-hidden hover:bg-none `}
                            style={{
                                backgroundImage: `url(${user.image})`,
                            }}
                            >
                        </div>
                        <div className="opacity-0 w-24 h-24 group-hover:bg-purple-700 rounded-full group-hover:opacity-50 absolute top-24 right-1/2 translate-x-1/2 cursor-pointer transition duration-200 ease-linear " 
                        >
                            <FormEditUser image={user?.image} fullname={user?.fullname} email={user?.email} phoneNumber={user?.phoneNumber} password={user.password} />
                        </div>
                        <div className='mt-12 text-center' >
                            <p>{user.fullname}</p>
                            <p className='text-xs' >{user.email}</p>
                            <Link href={'/patient/dashboard/account'} className={`flex items-center justify-center gap-1.5 mt-3 mb-1 font-semibold ${isHome[3] === 'account' ? 'text-purple-700' : 'text-black'} `} >
                                <i class='bx bxs-calendar'></i>
                                Home
                            </Link>
                            <Link href={'/patient/dashboard/family'} className={`flex items-center justify-center gap-2 font-semibold ${isFamily[3] === 'family' ? 'text-purple-700' : 'text-black'} `} >
                                <i class='bx bxs-user-plus'></i>
                                Anggota Keluarga
                            </Link>

                        </div>
                    </div>
                    <div className='w-full h-[300px] bg- rounded-lg' >
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}