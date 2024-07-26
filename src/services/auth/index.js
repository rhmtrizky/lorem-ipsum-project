import instance from '@/libs/axios/instance';

const authService = {
  registerAccount: (data) => instance.post('/api/user/register', data),
};

export default authService;
