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
  // Get the token from Authorization header, query parameters, or body
  let token = req.headers.authorization?.split(' ')[1] || req.query.token || req.body.token;
  console.log("Received token:", token);  // Log to see where the token comes from

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