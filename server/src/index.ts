import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware
import connectDB from './config/db';
import reportRoutes from './routes/reportRoutes';

dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for all origins (you can customize this)
app.use(cors());  // This will allow all incoming requests from any origin

// Middleware to parse JSON
app.use(express.json());

// Connect to DB
connectDB();

// Use routes
app.use('/api/reports', reportRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});