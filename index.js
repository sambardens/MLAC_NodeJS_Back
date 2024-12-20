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
    'https://mlac-react-admin.vercel.app', // Deployed admin frontend
];

// CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('CORS policy does not allow access from this origin'), false);
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // HTTP methods to allow
        allowedHeaders: ['Content-Type', 'Authorization'], // Headers to allow
    })
);

// Middleware for Parsing JSON and Cookies
app.use(express.json());
app.use(cookieParser());

// Middleware for File Uploads
app.use(fileUpload());

// Serve Static Files
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(express.static(path.resolve(__dirname, 'videos')));
app.use('/apidoc', express.static(path.resolve(__dirname, 'apidoc')));

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
