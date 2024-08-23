import instance from '@/libs/axios/instance';
import headers from '@/utils/headers';

const reviewService = {
  getReviews: () => instance.get('/api/review'),
  addReview: (data, token) => instance.post('/api/review', { data }, headers(token)),
};

export default reviewService;
