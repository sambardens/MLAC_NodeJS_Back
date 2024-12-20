// Import Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import scheme from './database/scheme.js';
import routes from './src/routes.js';
import errorsMiddleware from './src/errors/errors.middleware.js';

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// Define Port
const PORT = process.env.PORT || 3000; // Default to 3000 for local testing

// Allowed Origins for CORS
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://mlac-react-front.vercel.app', // Deployed frontend
];

// CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                console.log('CORS: Request with no origin allowed');
                return callback(null, true);
            }
            if (allowedOrigins.includes(origin)) {
                console.log(`CORS: Request from allowed origin: ${origin}`);
                return callback(null, true);
            } else {
                console.error(`CORS: Request blocked from origin: ${origin}`);
                return callback(new Error('CORS policy does not allow access from this origin'), false);
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Handle Preflight Requests Globally
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

// Middleware for Parsing JSON and Cookies
app.use(express.json());
app.use(cookieParser());

// Middleware for File Uploads
app.use(fileUpload({}));

// Serve Static Files
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(express.static(path.resolve(__dirname, 'videos')));
app.use('/apidoc', express.static(path.resolve(__dirname, 'apidoc')));

// Debugging Middleware for Incoming Requests
app.use((req, res, next) => {
    console.log('--- Incoming Request ---');
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Debugging Middleware for Responses
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('--- Response Sent ---');
        console.log('Status:', res.statusCode);
        console.log('Headers:', res.getHeaders());
    });
    next();
});

// Application Routes
app.use('/api', routes);

// Database Test Route
app.get('/db-test', async (req, res) => {
    try {
        console.log('Testing database connection...');
        const [result] = await scheme.query('SELECT 1 + 1 AS solution');
        res.json({ success: true, result });
    } catch (error) {
        console.error('Database test error:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health Check Endpoint
app.get('/health', (req, res) => {
    console.log('Health endpoint hit');
    res.status(200).json({ status: 'OK' });
});

// Error Handling Middleware
app.use(errorsMiddleware);

// Start the Application
async function startApplication() {
    try {
        console.log('Starting application...');
        // Database Connection
        await scheme.authenticate();
        console.log('Database connection established successfully.');

        // Sync Database Models
        await scheme.sync();
        console.log('Database synchronized successfully.');

        // Start Server
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the application:', error.message);
        process.exit(1); // Exit with failure
    }
}

startApplication();
