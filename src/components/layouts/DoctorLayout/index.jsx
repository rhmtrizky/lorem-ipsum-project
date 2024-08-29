import { useState } from 'react';
import SideBar from '../SideBar';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

const SideBarItems = [
  // {
  //   title: 'Dashboard',
  //   url: '/doctor',
  //   icon: 'bxs-dashboard',
  // },
  {
    title: 'Patient Queue',
    url: '/doctor',
    icon: 'bx bx-list-ul',
  },
  {
    title: 'Patient History',
    url: '/doctor/histories',
    icon: 'bxs-group',
  },
  {
    title: 'Profile settings',
    url: '/doctor/settings',
    icon: 'bxs-cog',
  },
];

const DoctorLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="w-full h-12 flex items-center justify-end bg-blue-500 fixed z-10">
        <button
          onClick={handleIsOpen}
          className="z-10 w-8 h-8 p-1.5 fixed flex  items-center justify-center text-white bg-blue-400 rounded-full my-4 mx-7"
        >
          {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
      </div>
      <div className="flex">
        <div className="flex w-full mt-12">
          <div className="w-full px-4 py-7 h-auto min-h-screen overflow-x-scroll ">{children}</div>
        </div>

        <SideBar
          lists={SideBarItems}
          title="Doctor Panel"
          bgColor={'pink'}
          isOpen={isOpen}
        />
      </div>
    </>
  );
};

export default DoctorLayout;
