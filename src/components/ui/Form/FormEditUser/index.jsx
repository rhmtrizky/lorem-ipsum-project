import { useSession } from 'next-auth/react';
import { Button, useDisclosure } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import ModalEditUser from '../../Modal/ModalEditUser';
import userService from '@/services/user';
import ImageUpload from '@/components/views/Admin/Ui/ImageUpload';
import Image from 'next/image';
import handleImageUpload from '@/utils/uploadImage';
import { ToasterContext } from '@/contexts/ToasterContext';

export default function FormEditUser({ user, setUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const [imageFile, setImageFile] = useState(null);
  const { setToaster } = useContext(ToasterContext);

  const [formData, setFormData] = useState({
    fullname: user.fullname,
    email: user.email,
    password: '',
    phoneNumber: user.phoneNumber,
    image: '',
  });

  if (!formData.image) {
    formData.image = user.image;
  }

  if (!formData.password) {
    delete formData.password;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = session?.user?.id;
      const result = await userService.updateUser(userId, formData, session.accessToken);
      console.log(result);

      if (result.status === 200) {
        if (imageFile) {
          const downloadUrl = await handleImageUpload(imageFile, userId, 'users', 'user image profile');
          console.log(downloadUrl);

          formData.image = downloadUrl;
          const result = await userService.updateUser(userId, formData, session.accessToken);
          if (result.status === 200) {
            const { data } = await userService.detailUser(session.accessToken);
            setUser(data.data);
            onOpenChange(false);
            setFormData({});
            setToaster({
              variant: 'success',
              message: 'Berhasil mengupdate profile',
            });
          }
        } else {
          const { data } = await userService.detailUser(session.accessToken);
          setUser(data.data);
          onOpenChange(false);
          setFormData({});
          setToaster({
            variant: 'success',
            message: 'Berhasil mengupdate profile',
          });
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setToaster({
        variant: 'error',
        message: 'Gagal mengupdate profile',
      });
    }
  };

  return (
    <ModalEditUser
      title="Edit Profile"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        {user?.image ? (
          <div className="flex flex-col items-center gap-2 justify-center w-full">
            <Image
              src={imageFile !== null || '' ? URL.createObjectURL(imageFile) : user?.image}
              alt="profile"
              width={300}
              height={300}
              className="rounded-full h-[200px] w-[200px] object-cover"
            />
            <div className="relative">
              <Button
                size="sm"
                className="bg-blue-500 text-white text-sm rounded-md"
              >
                Change Image
              </Button>
              <input
                className="absolute bg-color-gray z-0 bottom-0 left-0 w-full h-full opacity-0"
                type="file"
                name="image"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </div>
        ) : (
          <ImageUpload
            stateImage={imageFile}
            setStateImage={setImageFile}
          />
        )}
        <div className="w-full">
          <label
            htmlFor="nama-lengkap"
            className="mb-2 text-sm"
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
              name="fullname"
              value={formData.fullname}
              defaultValue={user.fullname}
              onChange={handleChange}
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Nama Lengkap Sesuai KTP"
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="email"
            className="mb-2 text-sm"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="bx bxl-gmail"></i>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              defaultValue={user.email}
              onChange={handleChange}
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Email"
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="mb-2 text-sm"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="bx bxs-key"></i>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="w-full">
          <label
            htmlFor="number-phone"
            className="mb-2 text-sm"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i className="bx bxs-phone"></i>
            </div>
            <input
              type="number"
              id="number-phone"
              name="phoneNumber"
              value={formData.phoneNumber}
              defaultValue={user.phoneNumber}
              onChange={handleChange}
              className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-[#654AB4] focus:shadow-lg bg-white rounded-lg outline-none"
              placeholder="Nomor Telepon"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="bg-[#654AB4] w-max py-2 px-3.5 rounded-lg text-white"
          whileHover={{ scale: 1.1 }}
        >
          Submit
        </motion.button>
      </form>
    </ModalEditUser>
  );
}
