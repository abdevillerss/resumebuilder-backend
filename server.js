
// const express = require('express');
// const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');
// const cors = require('cors'); // THIS LINE FIXES THE ERROR
// const path = require('path');

// // Configure dotenv at the very top
// dotenv.config();

// const { connectDB } = require('./config/db');
// const { notFound, errorHandler } = require('./middlewares/errorHandler');

// // Import routes
// const authRouter = require('./routes/authroutes');
// const resumeRoutes = require('./routes/resumeroutes');
// const aiRoutes = require('./routes/ai-routes');

// const app = express();

// // Connect to MongoDB
// connectDB();

// // --- START: FINAL CORS FIX ---
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));
// // --- END: FINAL CORS FIX ---

// // Middlewares to parse request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // API Routes
// app.use('/api/auth', authRouter);
// app.use('/api/resume', resumeRoutes);
// app.use('/api/ai', aiRoutes);

// // --- Deployment Configuration ---
// if (process.env.NODE_ENV === 'production') {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, 'frontend/build')));
//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     );
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running....');
//     });
// }

// // Error Middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });







const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// Import routes
const authRouter = require('./routes/authroutes');
const resumeRoutes = require('./routes/resumeroutes');
const aiRoutes = require('./routes/ai-routes');

// Configure dotenv
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// --- START: CORRECT CORS SETUP FOR RENDER ---
// This configuration allows your live frontend to communicate with your backend.
// It reads the frontend's URL from an environment variable you will set in Render.
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // If you need to handle cookies or authorization headers
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// --- END: CORRECT CORS SETUP FOR RENDER ---

// Middlewares to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});