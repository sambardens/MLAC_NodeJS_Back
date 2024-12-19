// Import Dependencies
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import scheme from './database/scheme.js';
import routes from './src/routes.js';
import errorsMiddleware from './src/errors/errors.middleware.js';

// Initialize Environment Variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Initialize Express App
const app = express();

// Define Port
const PORT = process.env.PORT || 3000; // Default to 3000 for local testing

// CORS Configuration
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://mlac-react-front.vercel.app', // Deployed frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps, curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                console.error(`CORS Error: ${msg} Origin: ${origin}`);
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // Allow cookies and authentication headers
    })
);

// Middleware to Parse JSON and URL-Encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-urlencoded data

// Middleware for Cookie Parsing
app.use(cookieParser());

// Middleware for File Uploads
app.use(fileUpload({}));

// Serve Static Files
app.use(express.static(path.resolve('images')));
app.use(express.static(path.resolve('videos')));
app.use('/apidoc', express.static('apidoc'));

// Debugging Middleware: Log Incoming Requests
app.use((req, res, next) => {
    console.log('--- Incoming Request ---');
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    next();
});

// Debugging Middleware: Log Response Headers After Response is Sent
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('--- Response Headers ---');
        console.log(res.getHeaders());
    });
    next();
});

// Application Routes
app.use('/api', routes);

// Health Check Endpoint (Optional but Recommended)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error Handling Middleware (Should Be Placed After All Routes)
app.use(errorsMiddleware);

// Start the Server After Successful Database Connection
async function startApplication() {
    try {
        // Authenticate Database Connection
        await scheme.authenticate();
        console.log('Database connection established successfully.');

        // Sync Database Models (Use { force: true } cautiously in production)
        await scheme.sync(); 
        console.log('Database synchronized successfully.');

        // Start Express Server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the application:', error);
        process.exit(1); // Exit process with failure
    }
}

// Initialize the Application
startApplication();
