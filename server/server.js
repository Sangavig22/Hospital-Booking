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

// Root route - fixes "Cannot GET /"

app.listen(process.env.PORT, () => {
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});


