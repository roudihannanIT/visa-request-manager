import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/database';
import { timeStamp } from 'node:console';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Basic test route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Visa request manager API us running',
        timeStamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'route not found!...'
    });
});

export default app;