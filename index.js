import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import * as path from 'path';
import scheme from './database/scheme.js';
import routes from './src/routes.js';
import errorsMiddleware from './src/errors/errors.middleware.js';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 3000; // Default to 3000 for local testing
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-urlencoded data
app.use(cookieParser());

// File upload middleware
app.use(fileUpload({}));
app.use(express.static(path.resolve('images')));
app.use(express.static(path.resolve('videos')));
app.use('/apidoc', express.static('apidoc'));

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // Local dev
    'https://mlac-react-front.vercel.app', // Deployed frontend
];

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
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Explicitly handle preflight OPTIONS requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Debugging logs
app.use((req, res, next) => {
    console.log('--- Incoming Request ---');
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    next();
});

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('--- Response Headers ---');
        console.log(res.getHeaders());
    });
    next();
});

// Application routes
app.use('/api', routes);

// Error handling middleware
app.use(errorsMiddleware);

// Start the server
async function startApplication() {
    try {
        await scheme.authenticate(); // Authenticate DB connection
        await scheme.sync(); // Sync DB
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the application:', error);
    }
}

startApplication();
