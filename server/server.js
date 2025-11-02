import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './config/connectDatabase.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import Profile from './model/profileModel.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname
(__filename);

dotenv.config({path: path.join(__dirname, 'config', 'config.env')});

// Connect to database
connectDatabase();

const app = express();
const allowedOrigins = ['http://localhost:5173',''];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
      origin: allowedOrigins,
    credentials: true
  
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/auth', messageRouter);
app.use('/api/auth', bookingRouter);
app.use('/api/auth', profileRouter);

// Fallback handler for profile GET to avoid 404 when no profile route matched for some reason.
// This ensures the frontend receives a 200 + data:null when a profile doesn't exist yet.
app.get('/api/auth/profile', async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) return res.json({ success: true, data: null });
        const profile = await Profile.findOne({ email });
        if (!profile) return res.json({ success: true, data: null });
        return res.json({ success: true, data: profile });
    } catch (err) {
        console.error('Fallback profile handler error', err);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// Root route - fixes "Cannot GET /"

app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});


