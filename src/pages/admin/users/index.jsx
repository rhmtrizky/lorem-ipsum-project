import AdminUsersView from '@/components/views/Admin/User';
import useDebounce from '@/hooks/useDebounce';
import useUser from '@/hooks/useUser';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AdminUsersManagementPage = () => {
  return <AdminUsersView />;
};

export default AdminUsersManagementPage;
