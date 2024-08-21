import { feedbackAnimation } from '@/assets/images/images'
import { Select, SelectItem, Textarea } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

export default function FeedbackView() {
    return (
        <section className='relative flex justify-center w-full h-[90vh] bg-gradient-to-b from-secondary to-primary overflow-hidden ' >
            <div className="bg-gradient-to-b to-[#e562a8] from-purple-900 w-52 h-52 absolute top-12 left-52 rounded-full" ></div>
            <div className="bg-[#e562a8] w-24 h-24 absolute top-52 left-52 rounded-full" ></div>
            <div className="w-[992px] h-max bg-feedback rounded-xl my-20 pb-10" >
                <div className="flex justify-between" >
                    <div className="m-10" >
                        <h1 className='text-primary text-4xl font-pacifico leading-[3rem] tracking-wider' >Bantu Kami dengan <br/> Masukkan Anda 😉</h1>
                        <p className='text-sm font-normal text-slate-600 mt-2' >Dukung kami dengan cara memberikan saran atau <br/>kritikan supaya kami bisa berkembang.</p>
                    </div>
                    <div className="w-[500px] absolute -top-32 right-0 " >
                        <Image src={feedbackAnimation} width={500} height={100} alt='loves.png'  />
                    </div>
                </div>

                <div className=" px-12 mt-20" >
                    <form className='w-full' >
                        <div className="flex items-end gap-4" >
                            <div className="w-full">
                                <label
                                    htmlFor="nama-lengkap"
                                    className="mb-2 text-sm sr-only"
                                >
                                    Nama/Inisial
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <i className="bx bxs-user"></i>
                                    </div>
                                    <input
                                    type="text"
                                    id="nama-lengkap"
                                    name="name"
                                    className="block w-full h-[49px] p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg focus:shadow-purple-200 bg-white rounded-lg outline-none"
                                    placeholder="Nama / Inisial "
                                    required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-start w-full">
                                <label>Seberapa Mudah Melakuan Pendaftaran Online?</label>
                                <div className="bg-white flex justify-start items-center border-[1px]  border-slate-400 rounded-lg mt-2">
                                <i className="bx bxs-time pl-4"></i>
                                <Select
                                    size="lg"
                                    placeholder="Pilih Salah Satu"
                                    className="w-full px-1.5 outline-none text-sm"
                                >
                                    <SelectItem
                                        className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                                    >
                                    Mudah
                                    </SelectItem>
                                    <SelectItem
                                        className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                                    >
                                    Sulit
                                    </SelectItem>
                                </Select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5" >
                            <Textarea
                                placeholder='Berikan Saran Atau Kritik Anda'
                                size="lg"
                                className='border-[1px] border-slate-400 rounded-lg bg-white'
                            />
                        </div>
                    </form>
                </div>


            </div>

        </section>
    )
}
