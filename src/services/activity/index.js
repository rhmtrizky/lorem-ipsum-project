import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const activityService = {
  getAllActivities: (token) => instance.get('/api/activity', headers(token)),
  addQueue: (data, token) => instance.post('/api/activity/queue', { data }, headers(token)),
  updateActivity: (id, data, token) => instance.put(`/api/activity/${id}`, { data }, headers(token)),
  deleteActivity: (id, token) => instance.delete(`/api/activity/${id}`, headers(token)),
  searchActivities: (keyword, token) => instance.get(`/api/activity?search=${keyword}`, headers(token)),
};

export default activityService;
