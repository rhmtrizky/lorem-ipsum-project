import ModalAppointmentsUi from '../Modal/ModalAppointments'
import DatePicker from '../DatePicker';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

export default function FormAdd() {

    return (
        <ModalAppointmentsUi
            title={'Add Family'}
        >
            <form className='w-full' >
                
                <div className='w-full flex items-end gap-5' >
                    <div className='w-full' >
                        <label for='nama-lengkap' className='mb-2 text-sm sr-only' >Nama Lengkap</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-user' ></i>
                            </div>
                            <input type='text' id='nama-lengkap' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none ' placeholder='Nama Lengkap Sesuai KTP' required />
                        </div>
                    </div>

                    <DatePicker/>
                </div>

                <div className='flex items-end gap-5 mt-4' >
                    <div className='w-full' >
                        <label for='tempat-lahir' className='mb-2 text-sm sr-only' >Tempat Lahir</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-map-alt' ></i>
                            </div>
                            <input type='text' id='tempat-lahir' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Tempat Lahir' required />
                        </div>
                    </div>

                    <div className='w-full' >
                        <label for='email' className='mb-2 text-sm sr-only' >Email</label>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxl-gmail' ></i>
                            </div>
                            <input type='email' id='email' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Email - Optional' />
                        </div>
                    </div>
                </div>
                
                <div className='flex items-end gap-5 mt-4' >
                    <div className='w-full' >
                        <label className='mb-2 text-sm sr-only' >Jenis Kelamin</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <Dropdown className='border' >
                            <DropdownTrigger>
                                <Button 
                                variant="bordered" 
                                className='flex justify-start border-[1px] border-slate-400 h-14 rounded-lg w-full '
                                >
                                    <i class='bx bx-male-female'></i>
                                    Golongan Darah
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className='bg-white shadow-lg' aria-label="Static Actions">
                                <DropdownItem  className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="pria">Pria</DropdownItem>
                                <DropdownItem  className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="wanita">Wanita</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className='w-full' >
                        <label className='mb-2 text-sm sr-only' >Golongan Darah</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <Dropdown className='border' >
                            <DropdownTrigger>
                                <Button 
                                variant="bordered" 
                                className='flex justify-start border-[1px] border-slate-400 h-14 rounded-lg w-full '
                                >
                                    <i class='bx bxs-donate-blood' ></i>
                                    Golongan Darah
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className='bg-white shadow-lg h-72 overflow-auto' aria-label="Static Actions">
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="a">A</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="a-plus">A+</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="a-minus">A-</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="b">B</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="b-plus">B+</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="b-minus">B-</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="o">O</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="o-plus">O+</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="o-minus">O-</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="o">AB</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="ab-plus">AB+</DropdownItem>
                                <DropdownItem className='hover:bg-[#654ab4c7] hover:text-white rounded-lg transition duration-100 ease-linear ' key="ab-minus">AB-</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                
                <div className='flex gap-5 mt-4' >
                    <div className='w-full' >
                        <label for='nama-ibu' className='mb-2 text-sm sr-only' >Nama Ibu</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-user'></i>
                            </div>
                            <input type='text' id='nama-ibu' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Nama Ibu' required />
                        </div>
                    </div>

                    <div className='w-full' >
                        <label for='nama-ayam' className='mb-2 text-sm sr-only' >Nama Ayah</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-user' ></i>
                            </div>
                            <input type='text' id='nama-ayah' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Nama Ayah' required />
                        </div>
                    </div>
                </div>

                <div className='flex gap-5 mt-4' >
                    <div className='w-full' >
                        <label for='nik' className='mb-2 text-sm sr-only' >NIK</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-file'></i>
                            </div>
                            <input type='text' id='nik' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='NIK' required />
                        </div>
                    </div>
                    <div className='w-full' >
                        <label for='no-hp' className='mb-2 text-sm sr-only' >No HP</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-phone' ></i>
                            </div>
                            <input type='text' id='no-hp' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='No HP - Jika Ada' required />
                        </div>
                    </div>
                </div>

                <div className='flex gap-5 mt-4' >
                    <div className='w-full' >
                        <label for='no-bpjs' className='mb-2 text-sm sr-only' >No BPJS</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-file'></i>
                            </div>
                            <input type='text' id='no-bpjs' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='No BPJS' required />
                        </div>
                    </div>
                    <div className='w-full' >
                        <label for='no-rekam-medis' className='mb-2 text-sm sr-only' >No Rekam Medis</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className='relative' >
                            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                                <i class='bx bxs-user' ></i>
                            </div>
                            <input type='text' id='no-rekam-medis' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='No Rekam Medis' required />
                        </div>
                    </div>
                </div>

                <div className='w-full mt-4' >
                    <label for='alamat' className='mb-2 text-sm sr-only' >Alamat</label>
                    <p className='text-red-700' >Harus diisi</p>
                    <div className='relative' >
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none' >
                            <i class='bx bxs-map'></i>
                        </div>
                        <input type='text' id='alamat' className='block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus-within:shadow-lg bg-white rounded-lg outline-none ' placeholder='Alamat' required />
                    </div>
                </div>


            </form>
        </ModalAppointmentsUi>
    )
}
