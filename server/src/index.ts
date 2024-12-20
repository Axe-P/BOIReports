import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import reportRoutes from './routes/reportRoutes';
import adminRoutes from './routes/adminRoutes';  // Assuming this is where admin functionality lives
import superUserRoutes from './config/superUser';  // Import superUser routes
import authMiddleware from './middlewares/authMiddleware';  // Import your authentication middleware

dotenv.config();

// Initialize Express app
const app = express();

app.use(cors()); // Enable CORS

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDB();

// Public Routes (No authentication required)
app.use('/api/reports', reportRoutes);  // Public route to get reports

// Superuser Routes
app.use('/api/superuser', superUserRoutes);  // Register superuser routes

// Admin Route - Protected by JWT authentication and role check
app.use('/api/admin', authMiddleware, adminRoutes);  // Apply the authentication middleware on admin routes

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});