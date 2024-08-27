import { call, mail } from '@/assets/images/images'
import React from 'react'
import LogoHarapanBunda from '../Logo'
import SocialMedia from '../SocialMedia'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className='w-full h-full' >
            <div className="bg-slate-900  flex items- justify-between w-full h-max min-[645px]:h-[252px] p-6" >
                <div className='flex max-[645px]:flex-col gap-12'>
                    <LogoHarapanBunda/>
                    <div className='text-white' >
                        <h1 className='mb-2 text-secondary font-bold text-lg' >Services</h1>
                        <ul className='flex flex-col gap-1.5 text-sm font-semibold ' >
                            <li>
                                <Link href={'find-doctor'} >Cari Dokter</Link>
                            </li>
                            <li>
                                <Link href={'/'} >Informasi</Link>
                            </li>
                            <li>
                                <Link href={'faq'} >FAQ</Link>
                            </li>
                            <li>
                                <Link href={'flow-bpjs-regis'} >Cara Daftar</Link>
                            </li>
                            <li>
                                <Link href={'feedback'} >Pengalaman Pelanggan</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='text-white' >
                        <h1 className='mb-2 text-secondary font-bold text-lg'  >Contact</h1>
                        <ul className='flex flex-col gap-1.5 text-sm font-semibold ' >
                            <li className='flex items-center' >
                                <Image src={mail} width={25} height={25} alt='mail.png' />
                                <span className='ml-2'>loremipsum@gmail.com</span>
                            </li>
                            <li className='flex items-center' >
                                <Image src={call} width={20} height={20} alt='mail.png' />
                                <span className='ml-2'>+62978324593</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <SocialMedia/>
                
            </div>
            <div className='w-full h-12 flex items-center justify-center bg-primary' >
                <span>Copyright | 2024</span>
            </div>
        </footer>
    )
}
