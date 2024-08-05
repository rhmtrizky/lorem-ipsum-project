import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const queueService = {
  getAllQueues: (token) => instance.get('/api/queue', headers(token)),
  addQueue: (data, token) => instance.post('/api/queue', { data }, headers(token)),
  searchQueue: (keyword, token) => instance.get(`/api/queue?search=${keyword}`, headers(token)),
};

export default queueService;
