import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();  // Use Router for route handlers

// Superuser credentials (consider moving this to a DB or config file for real apps)
const superuserUsername = 'auntadmin';
const superuserPassword = bcrypt.hashSync('supersecurepassword', 10);  // Hash the password once

// POST /login for superuser login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    // Check if the request body contains the necessary fields
    const { username, password } = req.body;
    
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;  // Return after sending the response
    }

    // Check if the username matches the superuser
    if (username !== superuserUsername) {
        res.status(401).json({ message: 'Invalid username' });
        return;  // Return after sending the response
    }

    // Check if the password matches the hashed password
    const isMatch = await bcrypt.compare(password, superuserPassword);
    if (!isMatch) {
        res.status(401).json({ message: 'Invalid password' });
        return;  // Return after sending the response
    }

    // Ensure JWT_SECRET exists in the environment variables
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ message: "JWT_SECRET is not set in environment variables" });
        return;  // Return after sending the response
    }

    // Sign the JWT with a 1-hour expiration
    const token = jwt.sign(
        { username: superuserUsername },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Return the token in the response
    res.status(200).json({ token });
});

export default router;  // Ensure the routes are exported