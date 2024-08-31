import React, { useState } from 'react';
import { gender, golDarah } from '@/constraint/adminPanel';
import { Select, SelectItem, useDisclosure } from '@nextui-org/react';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import ModalAddFamily from '../../Modal/ModalAddFamily';
import ImageUpload from '@/components/views/Admin/Ui/ImageUpload';
import handleImageUpload from '@/utils/uploadImage';
import ValidateNik from '@/utils/ValidateNik';

export default function FormAddFamily({ user, setUser, setToaster }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);
  const { nik, error, handleChangeNik } = ValidateNik();
  const handleAddPatient = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const newPatient = {
      name: formData.get('name'),
      nik: nik,
      bpjsNumber: formData.get('bpjsNumber'),
      bornPlace: formData.get('bornPlace'),
      bornDate: formData.get('bornDate'),
      gender: formData.get('gender'),
      address: formData.get('address'),
      golDarah: formData.get('golDarah'),
      fatherName: formData.get('fatherName'),
      motherName: formData.get('motherName'),
      suku: formData.get('suku'),
      bpjsCard: null,
    };

    try {
      const currentPatients = user.patient || [];
      const updatedPatients = [...currentPatients, newPatient];

      const result = await userService.updateUser(user.id, { patient: updatedPatients }, session?.accessToken);
      console.log(result);

      if (result.status === 200) {
        if (imageFile) {
          const downloadUrl = await handleImageUpload(imageFile, user.id, 'users', 'BPJS Card');

          updatedPatients[updatedPatients.length - 1].bpjsCard = downloadUrl;

          const result = await userService.updateUser(user.id, { patient: updatedPatients }, session?.accessToken);

          if (result.status === 200) {
            const response = await userService.detailUser(session?.accessToken);
            setUser(response.data.data);
            setToaster({
              variant: 'success',
              message: 'Aggota keluarga ditambahkan',
            });
          }
        } else {
          const response = await userService.detailUser(session?.accessToken);
          setUser(response.data.data);
          setToaster({
            variant: 'success',
            message: 'Aggota keluarga ditambahkan, namun gagal/tidak menambahkan BPJS Card',
          });
        }
      }

      setIsLoading(false);
      onOpenChange(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      onOpenChange(false);
      setToaster({
        variant: 'error',
        message: 'Aggota keluarga gagal ditambahkan',
      });
    }
  };

  return (
    <ModalAddFamily
      title={'Add Family'}
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
            Nama Lengkap
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="bx bxs-user"></i>
            </div>
            <input
              type="text"
              id="nama-lengkap"
              name="name"
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Nama Lengkap Sesuai KTP "
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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Tempat Lahir"
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
                <i className="bx bxs-calendar-alt"></i>
              </div>
              <input
                type="date"
                id="tanggal-lahir"
                name="bornDate"
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Tempat Lahir"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center w-full mt-4">
          <div className="flex flex-col justify-start w-1/2">
            <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
              <i className="bx bxs-time pl-4"></i>
              <Select
                name="gender"
                size="sm"
                placeholder="Jenis Kelamin"
                className="w-full px-1.5 outline-none text-sm"
                required
              >
                {gender?.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-col justify-start w-1/2">
            <div className=" flex justify-start items-center border-[1px] h-12 border-slate-400 rounded-lg mt-2">
              <i className="bx bxs-time pl-4"></i>
              <Select
                name="golDarah"
                size="sm"
                placeholder="Golongan Darah"
                className="w-full px-1.5 outline-none text-sm"
                required
              >
                {golDarah?.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="bg-white border-[1px] border-slate-400 py-3 rounded-lg"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Nama Ibu"
                required
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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Nama Ayah"
                required
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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="NIK"
                required
                onChange={(e) => handleChangeNik(e.target.value)}
              />
            </div>
            <p className="text-sm text-red-500">{error}</p>
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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Nomor BPJS"
                required
              />
            </div>
          </div>
        </div>

        <di className="flex flex-col items-start ">
          <p className="text-sm font-semibold mt-3">Upload Kartu BPJS</p>
          <ImageUpload
            stateImage={imageFile}
            setStateImage={setImageFile}
            title={'Upload Kartu BPJS'}
          />
        </di>

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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Alamat"
                required
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
                className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                placeholder="Suku"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className={`mt-4 ${error !== '' ? 'bg-blue-200' : 'bg-primary'} text-white py-2 px-4 rounded-lg w-full`}
            disabled={isLoading || error}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </ModalAddFamily>
  );
}
