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

// Define allowed origins for CORS
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://mlac-react-front.vercel.app', // Deployed frontend
];

// CORS Middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow request
            } else {
                console.error(`Blocked by CORS: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // Allow cookies and credentials
    })
);

// Explicitly handle preflight (OPTIONS) requests globally
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200); // Send OK status for preflight
});

// Debugging Logs to Trace Requests
app.use((req, res, next) => {
    console.log('--- Incoming Request ---');
    console.log('Origin:', req.headers.origin);
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    next();
});

// Log outgoing response headers
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('--- Response Headers ---');
        console.log(res.getHeaders());
    });
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
