import { Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import ModalQueueTicketUi from '../../Modal/ModalQueueTicket';

export default function FormQueueTicket({user, data}) {

    const [patientIndex, setPatientIndex] = useState()
    const [dataPatient, setDataPatient] = useState({})

    
    useEffect(() => {
        if(patientIndex >= 0 ) {
            setDataPatient(user.patient[patientIndex])
        }
        
    }, [patientIndex])

    const handleSubmitData = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)

        let data = {
            queueNumber: formattedResult,
            userId: patientAccId,
            name: currentPatientData.name,
            nik: formData.get('nik'),
            bpjsNumber: formData.get('bpjsNumber'),
            bornPlace: formData.get('bornPlace'),
            bornDate: formData.get('bornDate'),
            gender: formData.get('gender'),
            address: formData.get('address'),
            golDarah: formData.get('golDarah'),
            specialist: formData.get('specialist'),
            doctorId: formData.get('doctorId'),
            keluhan: formData.get('keluhan'),
            bookDate: bookDate,
            schedule: getSchedule,
            status: 'queue',
        };

    }
    
    
    console.log('data pasien index', dataPatient)
    console.log('pasien index', patientIndex)

    // console.log('test', user)

    return (
        <ModalQueueTicketUi title="Get Ticket">
            <form  className="w-full">

                <div className="w-full">
                    <label htmlFor="nama-lengkap" className="mb-2 text-sm sr-only">Nama Lengkap</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i className="bx bxs-user"></i>
                        </div>
                        <input 
                            type="text" 
                            id="nama-lengkap" 
                            name="fullName"
                            defaultValue={user.fullname}
                            className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                            placeholder="Nama Lengkap Sesuai KTP " 
                            required 
                            readOnly
                        />
                    </div>
                </div>
                

                <div className='flex gap-5 mt-4 ' >
                    <div className="w-full">
                        <label htmlFor="email" className="mb-2 text-sm sr-only">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxl-gmail"></i>
                            </div>
                            <input 
                                type="text" 
                                id="email" 
                                defaultValue={user.email}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Email - Optional" 
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="phone" className="mb-2 text-sm sr-only">Phone</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-phone"></i>
                            </div>
                            <input 
                                type="text" 
                                id="phone" 
                                defaultValue={user.phoneNumber}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Email - Optional" 
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                
                <div className="w-full mt-4">
                    <p className="text-red-700">Harus diisi</p>
                    <div className="flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg w-full">
                        <label className="mb-2 text-sm sr-only">Pilih Anggota Keluarga</label>
                        <i className="bx bxs-donate-blood pl-4"></i>
                        <Select
                                className='w-[90%] px-1.5 outline-none text-sm'
                                placeholder='Pilih Anggota Keluarga'
                                onChange={(e) => setPatientIndex(e.target.value)}
                            >
                            {
                                user.patient?.map((name, index) => (
                                        <SelectItem key={index} value={index} className='bg-white border-[1px] border-slate-400 py-3 rounded-lg' >{name.name}</SelectItem>
                                ))
                            }
                            </Select>
                    </div>
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
                                defaultValue={dataPatient?.bornPlace}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Tempat Lahir" 
                                required 
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="tanggal-lahir" className="mb-2 text-sm sr-only">Tanggal Lahir</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i class='bx bxs-calendar-alt'></i>
                            </div>
                            <input 
                                type="date" 
                                id="tanggal-lahir" 
                                name="bornDate"
                                defaultValue={dataPatient?.bornDate}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Tempat Lahir" 
                                required 
                                readOnly
                            />
                        </div>
                    </div>


                    
                </div>

                <div className="flex items-end gap-5 mt-4">

                <div className="w-full">
                        <label htmlFor="jenis-kelamin" className="mb-2 text-sm sr-only">Jenis Kelamin</label>
                        <p className='text-red-700' >Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i class='bx bx-male-female' ></i>
                            </div>
                            <input 
                                type="text" 
                                id="jenis-kelamin" 
                                defaultValue={dataPatient?.gender}
                                placeholder='Jenis Kelamin'
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label htmlFor="golongan-darah" className="mb-2 text-sm sr-only">Golongan Darah</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i class='bx bxs-donate-blood' ></i>
                            </div>
                            <input 
                                type="text" 
                                id="golongan-darah" 
                                placeholder='Golongan Darah'
                                defaultValue={dataPatient?.golDarah}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                readOnly
                            />
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
                                defaultValue={dataPatient?.motherName}
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
                                defaultValue={dataPatient?.fatherName}
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
                                defaultValue={dataPatient?.nik}
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
                                defaultValue={dataPatient?.bpjsNumber}
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
                                defaultValue={dataPatient?.address}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Alamat" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 mt-4">
                    <div className="w-full">
                        <label htmlFor="suku" className="mb-2 text-sm sr-only">Suku</label>
                        <p className="text-red-700">Harus diisi</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="bx bxs-map"></i>
                            </div>
                            <input 
                                type="text" 
                                id="suku"
                                defaultValue={dataPatient?.suku}
                                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none" 
                                placeholder="Suku" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="mt-4 bg-[#654AB4] text-white p-2 rounded-lg">
                    Submit
                </button>
            </form>
        </ModalQueueTicketUi>
    );
}