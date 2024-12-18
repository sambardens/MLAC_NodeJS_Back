import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import scheme from './database/scheme.js';
import routes from './src/routes.js';
import errorsMiddleware from './src/errors/errors.middleware.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Simplified CORS Configuration
app.use(cors({
    origin: '*', // Temporarily allow all origins for debugging
    credentials: true, // Allow cookies and credentials
}));

// Global Preflight Handling Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Respond to preflight requests
    }
    next();
});

// Debugging Logs to Trace Requests
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request Origin: ${req.headers.origin}`);
    console.log(`Request Path: ${req.path}`);
    next();
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
