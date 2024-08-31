import { signUp } from '@/services/auth/service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await signUp(req.body, (status, result) => {
      console.log(status, result);
      if (status) {
        res.status(200).json({
          status: true,
          message: 'success',
        });
      } else {
        res.status(400).json({
          status: false,
          message: 'failed',
        });
      }
    });
  } else {
    res.status(405).json({
      status: false,
      message: 'Method is not allowed',
    });
  }
}
