import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const userService = {
  getAllUsers: (token) => instance.get('/api/user', headers(token)),
  addUser: (data, token) => instance.post('/api/user', { data }, headers(token)),
  updateUser: (id, data, token) => instance.put(`/api/user/${id}`, { data }, headers(token)),
  deleteUser: (id, token) => instance.delete(`/api/user/${id}`, headers(token)),
  searchUser: (keyword, token) => instance.get(`/api/user?search=${keyword}`, headers(token)),
};

export default userService;