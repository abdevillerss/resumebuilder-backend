
// const express = require('express'); 
// const mongoose = require('mongoose'); 
// const cors = require('cors');       
// const dotenv = require('dotenv');   

// const authRouter = require('./routes/authroutes');     
// const resumeRouter = require('./routes/resumeroutes'); 
// const { notFound, errorHandler } = require('./middlewares/errorHandler'); 

// dotenv.config();


// const app = express();

// // Add this simple route to handle GET requests to the root URL
// app.get("/", (req, res) => {
//   res.send("Backend server is running.");
// });

// // ... your other app.use routes go here ...
// // e.g., app.use('/api/users', userRoutes);

// const corsOptions = {
//   origin: 'https://abdevillerss.github.io',
//   optionsSuccessStatus: 200 // For legacy browser support
// };

// app.use(cors(corsOptions));   


// app.use((req, res, next) => {
//   // Allow requests from your specific frontend URL
//   res.setHeader('Access-Control-Allow-Origin', 'https://abdevillerss.github.io');

//   // Allow specific methods the browser can use
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//   );

//   // Allow specific headers the browser can send
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization'
//   );

//   // Handle the OPTIONS preflight request
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });// Enables CORS for all routes, allowing our frontend to make requests.
// app.use(express.json()); 

// app.use((req, res, next) => {
//     console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
//     next(); // Pass control to the next middleware/handler
// });
// const MONGO_URI = process.env.MONGO_URI;


// mongoose.connect(MONGO_URI)
//     .then(() => console.log('Successfully connected to MongoDB.')) // Log a success message.
//     .catch(err => {

//         console.error('Database connection error:', err);
//         process.exit(1);
//     });


// app.use('/api/auth', authRouter);

// app.use('/api/resumes', resumeRouter);

// app.use(notFound);     
// app.use(errorHandler); 

// const PORT = process.env.PORT || 3001;


// app.listen(PORT, () => {
//     console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// --- Make sure these paths are correct for your file structure ---
const authRouter = require('./routes/authroutes');
const resumeRouter = require('./routes/resumeroutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// --- Create the Express App ---
const app = express();

// --- THE FINAL CORS FIX ---
// This robust configuration handles the browser's preflight request.
// It MUST come before your routes are defined.
const corsOptions = {
  origin: 'https://abdevillerss.github.io', // Your frontend URL
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(cors(corsOptions)); // Handle all other requests

// --- Middleware ---
// This allows your server to understand incoming JSON data.
app.use(express.json());

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => {
        console.error('Database connection error:', err);
    });

// --- API Routes ---
app.use('/api/auth', authRouter);
app.use('/api/resumes', resumeRouter);

// --- Root Route for Health Check ---
app.get("/", (req, res) => {
  res.send("Backend server is running correctly.");
});

// --- Error Handling Middleware ---
// This MUST come AFTER your routes.
app.use(notFound);
app.use(errorHandler);

// --- Local Server Start ---
// This part runs the server when you are testing on your own computer.
// Vercel will ignore this block.
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// --- Vercel Export ---
// This is what Vercel uses to run your code in its environment.
module.exports = app;