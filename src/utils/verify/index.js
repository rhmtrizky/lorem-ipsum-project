import jwt from 'jsonwebtoken';

const Verify = (req, res, callback) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.NEXTAUTH_SECRET || '', (err, decoded) => {
      if (decoded) {
        callback(decoded);
      } else {
        return res.status(403).json({
          status: false,
          statusCode: 403,
          message: 'Unauthorized',
        });
      }
    });
  } else {
    return res.status(403).json({
      status: false,
      statusCode: 403,
      message: 'Access Denied',
    });
  }
};

export default Verify;
