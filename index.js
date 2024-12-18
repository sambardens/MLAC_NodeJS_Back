import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import scheme from './database/scheme.js';
import routes from './src/routes.js';
import errorsMiddleware from './src/errors/errors.middleware.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import * as path from 'path';
import { createDeletionBap, dropBap } from './utils/drop-bap.js';
import futureCreatorBap from './utils/future-creator-bap.js';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // For local development
    'https://mlac-react-front-hwnbdac8r-sam-bardens-projects.vercel.app', // Deployed frontend
    'https://major-labl.pixy.pro', // Other origins
    'https://major-labl-admin.pixy.pro', // Admin portal origin
];

// CORS middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`CORS blocked for origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials like cookies
    })
);

// Explicit handling for preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Middleware for file uploads and static files
app.use(fileUpload({}));
app.use(express.static(path.resolve('images')));
app.use(express.static(path.resolve('videos')));
app.use('/apidoc', express.static('apidoc'));

// Application routes
app.use('/api', routes);

// Error handling middleware
app.use(errorsMiddleware);

// Start the application
async function startApplication() {
    try {
        await scheme.authenticate(); // Authenticate database connection
        await scheme.sync(); // Sync database
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    } catch (error) {
        console.error('Error starting the application:', error);
    }
}

startApplication();
