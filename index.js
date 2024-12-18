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

const PORT = process.env.PORT;
const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Updated CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // For local development
    'https://mlac-react-front-hwnbdac8r-sam-bardens-projects.vercel.app', // Deployed frontend
    'https://major-labl.pixy.pro', // Previously added origin
    'https://major-labl-admin.pixy.pro', // Previously added origin
];

// Allow CORS with credentials and dynamic origin
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow cookies and authorization headers
    })
);

// Handle preflight requests for all routes
app.options('*', cors());

// Middleware for file uploads and static files
app.use(fileUpload({}));
app.use(express.static(path.resolve('images')));
app.use(express.static(path.resolve('videos')));
app.use('/apidoc', express.static('apidoc'));

// Application routes and error handling middleware
app.use('/api', routes);
app.use(errorsMiddleware);

// Start the application
async function startApplication() {
    try {
        await scheme.authenticate();
        await scheme.sync();
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
    } catch (e) {
        console.error('Error starting the application:', e);
    }
}

startApplication();
