import instance from '@/libs/axios/instance';

const verifyEmailService = {
  updateVerifyEmail: (verifyToken, userId) => instance.put(`/api/verify-email?verifyToken=${verifyToken}&id=${userId}`),
};

export default verifyEmailService;
