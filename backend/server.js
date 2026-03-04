const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

// Only connect to DB once, not on every request
let isConnected = false;
const ensureDbConnection = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(helmet());

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://kumaran18.vercel.app'] 
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Middleware to ensure DB connection for all routes
app.use(async (req, res, next) => {
    try {
        await ensureDbConnection();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/interactions', require('./routes/interactionRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarkRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


// Root route
app.get('/', async (req, res) => {
    try {
        await ensureDbConnection();
        res.json({ message: 'API is running...', status: 'ok' });
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// For Vercel serverless deployment
if (process.env.VERCEL) {
    module.exports = app;
} else {
    // For local development
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}
