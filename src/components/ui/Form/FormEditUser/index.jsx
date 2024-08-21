import { useSession } from 'next-auth/react';
import { useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ModalEditUser from '../../Modal/ModalEditUser';
import userService from '@/services/user';

export default function FormEditUser({ image, fullname, email, phoneNumber }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        fullname: fullname,
        email: email,
        phoneNumber: phoneNumber,
    });

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
            await userService.updateUser(userId, formData, session.accessToken);
            console.log('Updated successfully');
            onOpenChange(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <ModalEditUser 
            title="Edit User" 
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
        >
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <div className="w-full">
                    <label htmlFor="nama-lengkap" className="mb-2 text-sm">
                        {fullname}
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
                            onChange={handleChange}
                            className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                            placeholder="Nama Lengkap Sesuai KTP"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label htmlFor="email" className="mb-2 text-sm">
                        {email}
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
                            onChange={handleChange}
                            className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                            placeholder="Email"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label htmlFor="number-phone" className="mb-2 text-sm">
                        {phoneNumber}
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
                            onChange={handleChange}
                            className="block w-full p-4 ps-10 text-sm text-gray-800 border border-slate-400 focus:border-primary focus:shadow-lg bg-white rounded-lg outline-none"
                            placeholder="Nomor Telepon"
                        />
                    </div>
                </div>

                <motion.button 
                    type='submit' 
                    className='bg-primary w-max py-2 px-3.5 rounded-lg text-white'
                    whileHover={{scale: 1.1}}
                >
                    Submit
                </motion.button>
            </form>
        </ModalEditUser>
    );
}
