import instance from '@/libs/axios/instance';

const queueActivityService = {
  getQueueActivity: () => instance.get('/api/activity/queue'),
};

export default queueActivityService;
