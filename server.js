
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors');       
const dotenv = require('dotenv');   

const authRouter = require('./routes/authroutes');     
const resumeRouter = require('./routes/resumeroutes'); 
const { notFound, errorHandler } = require('./middlewares/errorHandler'); 

dotenv.config();


const app = express();

// Add this simple route to handle GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Backend server is running.");
});

// ... your other app.use routes go here ...
// e.g., app.use('/api/users', userRoutes);

const corsOptions = {
  origin: 'https://abdevillerss.github.io',
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));   


app.use((req, res, next) => {
  // Allow requests from your specific frontend URL
  res.setHeader('Access-Control-Allow-Origin', 'https://abdevillerss.github.io');

  // Allow specific methods the browser can use
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );

  // Allow specific headers the browser can send
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // Handle the OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});// Enables CORS for all routes, allowing our frontend to make requests.
app.use(express.json()); 

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware/handler
});
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.')) // Log a success message.
    .catch(err => {

        console.error('Database connection error:', err);
        process.exit(1);
    });


app.use('/api/auth', authRouter);

app.use('/api/resumes', resumeRouter);

app.use(notFound);     
app.use(errorHandler); 

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});


// const express = require('express');
// const cors = require('cors');

// // IMPORTANT: Make sure these paths are correct based on your file structure
// const authRoutes = require('./routes/authroutes'); 
// const resumeRoutes = require('./routes/resumeroutes'); 

// const app = express();

// // --- CORS Configuration ---
// // This MUST come before your routes.
// // It allows your frontend at github.io to make requests to this backend.
// app.use(cors({
//   origin: 'https://abdevillerss.github.io'
// }));

// // --- Middleware ---
// // This allows your server to understand incoming JSON data.
// app.use(express.json());

// // --- API Routes ---
// // All your API endpoints are defined here.
// // The frontend will call URLs like '/api/auth/login'.
// app.use('/api/auth', authRoutes);
// app.use('/api/resumes', resumeRoutes);

// // --- Root Route for Health Check ---
// // A simple route to confirm the server is running.
// app.get("/", (req, res) => {
//   res.send("Backend server is running correctly.");
// });

// // --- Vercel Export ---
// // This is the most important part. We export the configured 'app' for Vercel's
// // serverless environment to use. We DO NOT call app.listen(). Vercel does this for us.
// module.exports = app;