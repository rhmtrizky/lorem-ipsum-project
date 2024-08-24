import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from "react-icons/io";
import SideBar from '../SideBar';

const SideBarItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: 'bxs-dashboard',
  },
  {
    title: 'Patient Activity',
    url: '/admin/activities',
    icon: 'bx bx-list-ul',
  },
  {
    title: 'Users Management',
    url: '/admin/users',
    icon: 'bxs-group',
  },
];

const AdminLayout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
    console.log(isOpen)
  }

  return (
    <>
      <div className='w-full h-12 flex items-center justify-end bg-blue-500 fixed z-10' >
        <button onClick={handleIsOpen} className='z-10 w-8 h-8 p-1.5 fixed flex  items-center justify-center text-white bg-blue-400 rounded-full my-4 mx-7' >
          {
            isOpen ?
            <IoMdClose />
            :
            <GiHamburgerMenu/>
          }
        </button>
      </div>

      <div className="flex">

        <div className="flex w-full mt-12">
          <div className="w-full px-4 py-7 h-auto min-h-screen overflow-x-scroll ">{children}</div>
        </div>

        <SideBar
          lists={SideBarItems}
          title="Admin Panel"
          bgColor={'pink'}
          isOpen={isOpen}
        />

      </div>
    </>
  );
};

export default AdminLayout;
