import SideBar from './SideBar';

const SideBarItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: 'bxs-dashboard',
  },
  {
    title: 'Users Management',
    url: '/admin/users',
    icon: 'bxs-group',
  },
];

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex lg:flex md:flex sm:hidden hidden">
        <div className="ml-[20%] w-full px-10 py-7 h-auto min-h-screen overflow-auto">{children}</div>

        <SideBar
          lists={SideBarItems}
          title="Admin Panel"
          bgColor={'pink'}
        />
      </div>
      <div className="w-full h-screen lg:hidden md:hidden sm:flex flex justify-center items-center">
        <h1>For admin panel, you can open in dekstop only</h1>
      </div>
    </>
  );
};

export default AdminLayout;
