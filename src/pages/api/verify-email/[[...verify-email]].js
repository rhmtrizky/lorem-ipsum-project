import { retrieveDataById, updateData } from '@/libs/firebase/service';
import crypto from 'crypto';

export default async function handler(req, res) {
  const { verifyToken, id: userId } = req.query;

  if (req.method === 'PUT') {
    try {
      if (!verifyToken || !userId) {
        return res.status(400).json({ status: false, message: 'Invalid or missing token' });
      }

      // Hash the received token to match the stored one
      const hashedToken = crypto.createHash('sha256').update(verifyToken).digest('hex');

      // Retrieve the user from the database using userId
      const user = await retrieveDataById('users', userId);

      // Check if the token matches and is still valid
      if (!user) {
        return res.status(400).json({ status: false, message: 'Invalid or expired token' });
      }

      // Update the user to set isVerified to true and clear the token
      const data = {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpire: null,
      };

      await updateData('users', userId, data, (result) => {
        console.log(data);
        console.log(result);

        if (result) {
          return res.status(200).json({ status: true, message: 'Email verified successfully', data });
        } else {
          return res.status(400).json({ status: false, message: 'Failed to update verification status' });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ status: false, message: 'Method not allowed' });
  }
}
