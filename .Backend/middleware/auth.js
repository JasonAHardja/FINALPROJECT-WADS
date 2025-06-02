// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// export const auth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     try {
//       const token = authHeader.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user data from DB
//       req.user = await User.findById(decoded.userId).select('-password');
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }
//   } else {
//     return res.status(401).json({ message: 'No token provided' });
//   }
// };
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded JWT:", decoded);

      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        console.log("User not found in DB");
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    console.log("No token provided or wrong format");
    return res.status(401).json({ message: 'No token provided' });
  }
};
