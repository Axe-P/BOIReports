import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedToken;
  }
}

// Define the shape of the decoded JWT payload
interface DecodedToken {
  username: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("Received token: ", token);

  // Check if token is provided
  if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
  }

  try {
    // Decode and verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    // Check if the username in the token matches the superuser's username
    if (decoded.username !== 'auntadmin') {
       res.status(403).json({ message: 'Access denied. Only superuser can access this route.' });
       return;
    }

    // Attach the decoded user data (username) to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err: any) {
    // Handle specific errors (e.g., expired token)
    if (err instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token has expired, please login again' });
        return;
    }

    // Handle malformed or invalid token errors
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
};

export default authMiddleware;