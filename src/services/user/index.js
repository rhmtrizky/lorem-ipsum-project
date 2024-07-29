import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const userService = {
  getAllUsers: (token) => instance.get('/api/user', headers(token)),
  updateUser: (id, data, token) => instance.put(`/api/user/${id}`, { data }, headers(token)),
  deleteUser: (id, token) => instance.delete(`/api/user/${id}`, headers(token)),
};

export default userService;
