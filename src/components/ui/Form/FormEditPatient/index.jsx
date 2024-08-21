import React, { useState } from 'react';
import { gender, golDarah } from '@/constraint/adminPanel';
import { Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import ModalEditPatient from '../../Modal/ModalEditPatient';
import userService from '@/services/user';

export default function FormEditPatient({ user, setUser, patient }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const form = e.target;
    const formData = new FormData(form);
  
    const updatedPatient = {
      name: formData.get('name'),
      nik: formData.get('nik'),
      bpjsNumber: formData.get('bpjsNumber'),
      bornPlace: formData.get('bornPlace'),
      bornDate: formData.get('bornDate'),
      gender: formData.get('gender'),
      address: formData.get('address'),
      golDarah: formData.get('golDarah'),
      fatherName: formData.get('fatherName'),
      motherName: formData.get('motherName'),
      suku: formData.get('suku'),
    };
  
    try {
      const currentPatients = user.patient || [];
  
      // Gunakan NIK lama untuk mencari pasien yang akan diupdate
      const patientIndex = currentPatients.findIndex(p => p.nik === patient.nik);
  
      if (patientIndex !== -1) {
        // Update data pasien yang ditemukan dengan data baru
        currentPatients[patientIndex] = updatedPatient;
      } else {
        // Jika pasien tidak ditemukan, tambahkan ke daftar
        currentPatients.push(updatedPatient);
      }
  
      const result = await userService.updateUser(user.id, { patient: currentPatients }, session?.accessToken);
  
      if (result.status === 200) {
        const response = await userService.detailUser(session?.accessToken);
        setUser(response.data.data);
        setIsLoading(false);
        onOpenChange(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      onOpenChange(false);
    }
  };
  

  return (
    <ModalEditPatient
      title="Edit Data Profile"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <form
        className="w-full"
        onSubmit={handleAddPatient}
      >
        <div className="w-full">
          <label
            htmlFor="nama-lengkap"
            className="mb-2 text-sm sr-only"
          >
            FullName
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="bx bxs-user"></i>
            </div>
            <input
              type="text"
              id="nama-lengkap"
              name="name"
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Nama Lengkap Sesuai KTP "
              defaultValue={patient.name}
              required
            />
          </div>
        </div>

        <div className="flex items-end gap-5 mt-4">
          <div className="w-full">
            <label
              htmlFor="tempat-lahir"
              className="mb-2 text-sm sr-only"
            >
              Tempat Lahir
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-map-alt"></i>
              </div>
              <input
                type="text"
                id="tempat-lahir"
                name="bornPlace"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Tempat Lahir"
                defaultValue={patient.bornPlace}
                required
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="tanggal-lahir"
              className="mb-2 text-sm sr-only"
            >
              Tanggal Lahir
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i class="bx bxs-calendar-alt"></i>
              </div>
              <input
                type="date"
                id="tanggal-lahir"
                name="bornDate"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Tempat Lahir"
                defaultValue={patient.bornDate}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center w-full mt-4">
          <div className="flex flex-col justify-start w-1/2">
            <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
              <i className="bx bxs-time pl-4"></i>
              <select
                name="gender"
                size="sm"
                placeholder="Jenis Kelamin"
                className="w-full px-1.5 outline-none text-sm"
                required
                defaultValue={patient.gender}
              >
                {gender?.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-start w-1/2">
            <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
              <i className="bx bxs-time pl-4"></i>
              <select
                name="golDarah"
                size="sm"
                placeholder="Golongan Darah"
                className="w-full px-1.5 outline-none text-sm"
                required
                defaultValue={patient.golDarah}
              >
                {golDarah?.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-4">
          <div className="w-full">
            <label
              htmlFor="nama-ibu"
              className="mb-2 text-sm sr-only"
            >
              Nama Ibu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-user"></i>
              </div>
              <input
                type="text"
                id="nama-ibu"
                name="motherName"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Nama Ibu"
                required
                defaultValue={patient.motherName}
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="nama-ayah"
              className="mb-2 text-sm sr-only"
            >
              Nama Ayah
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-user"></i>
              </div>
              <input
                type="text"
                id="nama-ayah"
                name="fatherName"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Nama Ayah"
                required
                defaultValue={patient.fatherName}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-4">
          <div className="w-full">
            <label
              htmlFor="nik"
              className="mb-2 text-sm sr-only"
            >
              NIK
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-file"></i>
              </div>
              <input
                type="number"
                id="nik"
                name="nik"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="NIK"
                defaultValue={patient.nik}
              />
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="bpjsNumber"
              className="mb-2 text-sm sr-only"
            >
              No BPJS
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-id-card"></i>
              </div>
              <input
                type="number"
                id="bpjsNumber"
                name="bpjsNumber"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Nomor BPJS"
                required
                defaultValue={patient.bpjsNumber}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-4">
          <div className="w-full">
            <label
              htmlFor="alamat"
              className="mb-2 text-sm sr-only"
            >
              Alamat
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-map"></i>
              </div>
              <input
                type="text"
                id="alamat"
                name="address"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Alamat"
                required
                defaultValue={patient.address}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-4">
          <div className="w-full">
            <label
              htmlFor="suku"
              className="mb-2 text-sm sr-only"
            >
              Suku
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bxs-map"></i>
              </div>
              <input
                type="text"
                id="suku"
                name="suku"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Suku"
                required
                defaultValue={patient.suku}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="mt-4 bg-[#654AB4] text-white py-2 px-4 rounded-lg"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </ModalEditPatient>
  );
}