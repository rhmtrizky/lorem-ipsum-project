import React from 'react'
import ModalAppointmentsUi from '../ModalAppointments'

export default function FormAdd() {
    return (
        <ModalAppointmentsUi
            title={'Add Family'}
        >
            <form  >
                
                <div className='flex items-end gap-5' >
                    <div>
                        <label for='nama-lengkap' className='mb-2 text-sm sr-only' >Nama Lengkap</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-user' ></i>
                            </div>
                            <input type='text' id='nama-lengkap' className='block w-[250px] p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none ' placeholder='Nama Lengkap Sesuai KTP' required />
                        </div>
                    </div>

                    <div>
                        <label for='email' className='mb-2 text-sm sr-only' >Email</label>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bx-envelope' ></i>
                            </div>
                            <input type='email' id='email' className='block w-[250px] p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Email - Optional' />
                        </div>
                    </div>
                </div>

                <div>
                    <label for='tempat-lahir' className='mb-2 text-sm sr-only' >Tempat Lahir</label>
                    <p className='text-red-700' >Harus diisi</p>
                    <div className='relative' >
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                            <i class='bx bx-map-alt'></i>
                        </div>
                        <input type='text' id='tempat-lahir' className='block w-[250px] p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Tempat Lahir' required />
                    </div>
                </div>


                <div>
                    <label for='nama-ayam' className='mb-2 text-sm sr-only' >Nama Ayah</label>
                    <p className='text-red-700' >Harus diisi</p>
                    <div className='relative' >
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                            <i class='bx bx-map-alt'></i>
                        </div>
                        <input type='text' id='nama-ayah' className='block w-[250px] p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Nama Ayah' required />
                    </div>
                </div>

                <div>
                    <label for='nama-ibu' className='mb-2 text-sm sr-only' >Nama Ibu</label>
                    <p className='text-red-700' >Harus diisi</p>
                    <div className='relative' >
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                            <i class='bx bx-map-alt'></i>
                        </div>
                        <input type='text' id='nama-ibu' className='block w-[250px] p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Email - Optional' required />
                    </div>
                </div>

            </form>
        </ModalAppointmentsUi>
    )
}
