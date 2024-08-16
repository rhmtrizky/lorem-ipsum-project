import ModalAppointmentsUi from '../Modal/ModalAppointments';
import { Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import userService from '@/services/user';

export default function FormAdd() {
    return (
        <ModalAppointmentsUi title="Add Family">
            <form  className="w-full">
                <div className="w-full flex items-end gap-5">
                    <div className="w-full">
                        <label htmlFor="nama-lengkap" className="mb-2 text-sm sr-only">Nama Lengkap</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-user"></i>
                            </div>
                            <input 
                                type="text" 
                                id="nama-lengkap" 
                                name="fullName"
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Nama Lengkap Sesuai KTP" 
                                required 
                            />
                        </div>
                    </div>
                    <input 
                        type="date" 
                        name="birthDate"
                        className="block w-full p-4 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                        required 
                    />
                </div>

                <div className="flex items-end gap-5 mt-4">
                    <div className="w-full">
                        <label htmlFor="tempat-lahir" className="mb-2 text-sm sr-only">Tempat Lahir</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-map-alt"></i>
                            </div>
                            <input 
                                type="text" 
                                id="tempat-lahir" 
                                name="birthPlace"
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Tempat Lahir" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="email" className="mb-2 text-sm sr-only">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxl-gmail"></i>
                            </div>
                            <input 
                                type="text" 
                                id="email" 
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Email - Optional" 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-end gap-5 mt-4">
                    <div className="w-full">
                        <p className="text-red-700">Harus diisi</p>
                        <div className="flex justify-start items-center border-[1px] h-14 border-slate-400 rounded-lg w-full">
                            <label className="mb-2 text-sm sr-only">Jenis Kelamin</label>
                            <i className="bx bx-male-female pl-4"></i>
                            <Select 
                                size="lg" 
                                label="" 
                                placeholder="Jenis Kelamin"
                                name="gender"
                            >
                                <SelectItem key="pria" value="pria" className="bg-white">Pria</SelectItem>
                                <SelectItem key="wanita" value="wanita" className="bg-white">Wanita</SelectItem>
                            </Select>
                        </div>
                    </div>

                    <div className="w-full">
                        <p className="text-red-700">Harus diisi</p>
                        <div className="flex justify-start items-center border-[1px] h-14 border-slate-400 rounded-lg w-full">
                            <label className="mb-2 text-sm sr-only">Golongan Darah</label>
                            <i className="bx bxs-donate-blood pl-4"></i>
                            <Select 
                                size="lg" 
                                label="" 
                                placeholder="Golongan Darah"
                            >
                                <SelectItem className="bg-white">A</SelectItem>
                                <SelectItem className="bg-white">O</SelectItem>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <label htmlFor="nama-ibu" className="mb-2 text-sm sr-only">Nama Ibu</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-user"></i>
                            </div>
                            <input 
                                type="text" 
                                id="nama-ibu" 
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Nama Ibu" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="nama-ayah" className="mb-2 text-sm sr-only">Nama Ayah</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-user"></i>
                            </div>
                            <input 
                                type="text" 
                                id="nama-ayah" 
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Nama Ayah" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <label htmlFor="nik" className="mb-2 text-sm sr-only">NIK</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-file"></i>
                            </div>
                            <input 
                                type="text" 
                                id="nik" 
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="NIK" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="bpjsNumber" className="mb-2 text-sm sr-only">No BPJS</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-id-card"></i>
                            </div>
                            <input 
                                type="text" 
                                id="bpjsNumber" 
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Nomor BPJS" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <label htmlFor="alamat" className="mb-2 text-sm sr-only">Alamat</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-map"></i>
                            </div>
                            <input 
                                type="text" 
                                id="alamat" 
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Alamat" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="mt-4 bg-[#654AB4] text-white p-2 rounded-lg">
                    Submit
                </button>
            </form>
        </ModalAppointmentsUi>
    );
}